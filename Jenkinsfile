pipeline {
    agent { label 'node-agent' }
    
    environment {
        IMAGE_NAME = "writetoritika/node-todo-test"
        TAG = "${env.BUILD_NUMBER}"  // Unique tag per build
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/writetoritika/node-todo-cicd.git', branch: 'master' 
            }
        }

        stage('Build and Test') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${TAG} ."
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerHub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
                    sh "echo ${env.dockerHubPassword} | docker login -u ${env.dockerHubUser} --password-stdin"
                    sh "docker tag ${IMAGE_NAME}:${TAG} ${IMAGE_NAME}:latest"
                    sh "docker push ${IMAGE_NAME}:${TAG}"
                    sh "docker push ${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Deploy Application') {
            steps {
                sh '''
                docker-compose down || true
                docker pull ${IMAGE_NAME}:latest
                docker-compose up -d
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful!"
        }
        failure {
            echo "❌ Deployment Failed!"
        }
    }
}
