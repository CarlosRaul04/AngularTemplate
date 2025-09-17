pipeline {
  agent any
  options { disableConcurrentBuilds() }

  environment {
    // ↙↙↙ DÓNDE SERVIRÁ NGINX TU TEMPLATE
    DEPLOY_DIR = '/var/www/neos-template'
    EMAIL_TO   = 'carlos@neosaisolutions.com'
  }

  stages {

    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install deps') {
      steps {
        sh '''
          set -e
          node -v || true
          npm  -v || true
          echo "Installing dependencies..."
          npm ci
          # angular/cli puede no estar en package.json en templates
          npm i -D @angular/cli || true
        '''
      }
    }

    stage('Build (production)') {
      steps {
        sh '''
          set -e
          echo "Building Angular (production)..."
          npx ng build --configuration=production

          echo "Resolviendo carpeta dist generada..."
          # Intenta: dist/<app>/browser/index.html (Angular 17+)
          # Fallback: dist/<app>/index.html
          DIST_DIR=""
          for CAND in dist/*/browser dist/* ; do
            if [ -f "$CAND/index.html" ]; then DIST_DIR="$CAND"; break; fi
          done
          if [ -z "$DIST_DIR" ]; then
            echo "❌ No se encontró index.html dentro de dist/* (ni dist/*/browser)."
            ls -la dist || true
            exit 1
          fi
          echo "✅ DIST_DIR -> $DIST_DIR"

          # Ejecuta tu script de alias si existe
          if [ -f scripts/postbuild-alias-css.mjs ]; then
            echo "Ejecutando scripts/postbuild-alias-css.mjs..."
            node scripts/postbuild-alias-css.mjs || true
          fi

          # Si no quedó styles.css, crea alias desde styles-*.css
          if [ ! -f "$DIST_DIR/styles.css" ]; then
            HASHED=$(ls "$DIST_DIR"/styles-*.css 2>/dev/null | head -n1 || true)
            if [ -n "$HASHED" ]; then
              cp "$HASHED" "$DIST_DIR/styles.css"
              echo "🔗 Alias creado: $DIST_DIR/styles.css (desde $(basename "$HASHED"))"
            else
              echo "⚠️ No hay styles.css ni styles-*.css (es normal si usas CSS inline)."
            fi
          fi

          # Sanity checks básicos
          test -f "$DIST_DIR/index.html"
          # Exporta ruta encontrada a un archivo para siguientes stages
          echo "$DIST_DIR" > .dist_dir
        '''
      }
    }

    stage('Deploy to Nginx') {
      steps {
        sh '''
          set -e
          DIST_DIR="$(cat .dist_dir)"
          echo "Deploying from $DIST_DIR to ${DEPLOY_DIR} ..."

          TMP_DIR="$(mktemp -d)"
          cp -a "$DIST_DIR/." "$TMP_DIR/"

          sudo mkdir -p "$(dirname ${DEPLOY_DIR})"
          sudo rm -rf "${DEPLOY_DIR}.old" || true
          if [ -d "${DEPLOY_DIR}" ]; then sudo mv "${DEPLOY_DIR}" "${DEPLOY_DIR}.old"; fi
          sudo mv "$TMP_DIR" "${DEPLOY_DIR}"

          sudo chown -R www-data:www-data "${DEPLOY_DIR}"
          sudo find "${DEPLOY_DIR}" -type d -exec chmod 755 {} +
          sudo find "${DEPLOY_DIR}" -type f -exec chmod 644 {} +

          sudo systemctl reload nginx
          echo "✅ Deploy OK"
        '''
      }
    }
  }

  post {
    success {
      script {
        def now = new Date().format("yyyy-MM-dd HH:mm", TimeZone.getTimeZone('UTC'))
        emailext(
          subject: "✅ ${env.JOB_NAME} #${env.BUILD_NUMBER} OK (${now} UTC)",
          body: """<p><b>Status:</b> SUCCESS</p>
                   <p><b>Job:</b> ${env.JOB_NAME}</p>
                   <p><b>Build #:</b> ${env.BUILD_NUMBER}</p>
                   <p><b>Branch:</b> ${env.GIT_BRANCH}</p>
                   <p><a href="${env.BUILD_URL}">Ver consola</a></p>""",
          mimeType: 'text/html',
          to: env.EMAIL_TO
        )
      }
    }
    failure {
      script {
        def now = new Date().format("yyyy-MM-dd HH:mm", TimeZone.getTimeZone('UTC'))
        emailext(
          subject: "❌ ${env.JOB_NAME} #${env.BUILD_NUMBER} FAILED (${now} UTC)",
          body: """<p><b>Status:</b> FAILURE</p>
                   <p><b>Job:</b> ${env.JOB_NAME}</p>
                   <p><b>Build #:</b> ${env.BUILD_NUMBER}</p>
                   <p><b>Branch:</b> ${env.GIT_BRANCH}</p>
                   <p><a href="${env.BUILD_URL}">Ver consola</a></p>""",
          mimeType: 'text/html',
          to: env.EMAIL_TO
        )
      }
    }
    always {
      echo "Build result: ${currentBuild.currentResult}"
    }
  }
}
