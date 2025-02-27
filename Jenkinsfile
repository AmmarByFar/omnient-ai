pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'omnient-studios'
        DOCKER_CONTAINER = 'omnient-studios'
        CONTAINER_PORT = '3000'
        HOST_PORT = '3002'
        LOG_MAX_SIZE = '10m'
        LOG_MAX_FILE = '3'
        MAILGUN_API_KEY = credentials('omniant-studio-mailgun-api-key')
        MAILGUN_DOMAIN = credentials('omniant-studio-mailgun-domain')
        // SUPABASE_SERVICE_KEY = credentials('omnient-studios-supabase-service-key')
        // NEXT_PUBLIC_SUPABASE_ANON_KEY = credentials('omnient-studios-supabase-anon-key')
        // NEXT_PUBLIC_SUPABASE_URL = credentials('omnient-studios-supabase-url')
    }

    stages {
        stage('Checkout') {
            steps {
                cleanWs()
                checkout scm
            }
        }

        stage('Build and Test') {
            agent {
                docker {
                    image 'node:20.11.0-alpine'
                    reuseNode true
                    args '--user root'
                }
            }
            steps {
                // Set up npm cache directory with correct permissions
                sh '''
                    mkdir -p /.npm
                    chown -R 1001:1002 /.npm
                    npm install
                    npm run build
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Create Dockerfile if it doesn't exist
                    writeFile file: 'Dockerfile', text: '''
                        FROM node:20.11.0-alpine
                        WORKDIR /app
                        
                        # Create app directory and set permissions
                        RUN mkdir -p /app /.npm && \
                            chown -R node:node /app /.npm

                        # Switch to non-root user
                        USER node

                        COPY --chown=node:node . .
                        RUN npm install --production
                        EXPOSE 3000
                        CMD ["npm", "start"]
                    '''

                    // Build the Docker image
                    sh "docker build -t ${DOCKER_IMAGE}:latest ."
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Stop and remove existing container if it exists
                    sh '''
                        if docker ps -a | grep -q ${DOCKER_CONTAINER}; then
                            docker stop ${DOCKER_CONTAINER}
                            docker rm ${DOCKER_CONTAINER}
                        fi
                    '''

                    // Run the new container
                    sh """
                        docker run -d \
                            --name ${DOCKER_CONTAINER} \
                            -p ${HOST_PORT}:${CONTAINER_PORT} \
                            --restart unless-stopped \
                            --log-driver json-file \
                            --log-opt max-size=${LOG_MAX_SIZE} \
                            --log-opt max-file=${LOG_MAX_FILE} \
                            -e MAILGUN_API_KEY=${MAILGUN_API_KEY} \
                            -e MAILGUN_DOMAIN=${MAILGUN_DOMAIN} \
                            ${DOCKER_IMAGE}:latest
                    """
                }
            }
        }

    }

    post {
        success {
            echo 'Docker deployment successful!'
            echo 'To view logs in production, use these commands:'
            sh '''
                echo "View logs: docker logs ${DOCKER_CONTAINER}"
                echo "Follow logs: docker logs -f ${DOCKER_CONTAINER}"
                echo "View errors only: docker logs ${DOCKER_CONTAINER} 2>&1 | grep -i error"
            '''
        }
        
        failure {
            echo 'Docker deployment failed!'
            // Capture logs before cleanup
            sh '''
                if docker ps -a | grep -q ${DOCKER_CONTAINER}; then
                    echo "Container logs before cleanup:"
                    docker logs ${DOCKER_CONTAINER}
                    docker stop ${DOCKER_CONTAINER}
                    docker rm ${DOCKER_CONTAINER}
                fi
            '''
        }
        always {
            cleanWs()
        }
    }
}
