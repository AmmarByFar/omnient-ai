pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'omnient-studios'
        DOCKER_CONTAINER = 'omnient-studios'
        CONTAINER_PORT = '3000'
        HOST_PORT = '3002'
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
                    args '-u root:root'
                }
            }
            steps {
                // Set up npm cache directory with correct permissions
                sh '''
                    mkdir -p /.npm
                    chown -R $(id -u):$(id -g) /.npm
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
                            ${DOCKER_IMAGE}:latest
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Docker deployment successful!'
        }
        failure {
            echo 'Docker deployment failed!'
            // Clean up if deployment failed
            sh '''
                if docker ps -a | grep -q ${DOCKER_CONTAINER}; then
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
