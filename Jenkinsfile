pipeline {
  agent any

  environment {
    IMAGE_NAME = 'gaurav6502/sample-node-app' 
  }

  stages {

    stage('Checkout Code') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $IMAGE_NAME .'
      }
    }

    stage('Login to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
          '''
        }
      }
    }

    stage('Push Image to Docker Hub') {
      steps {
        sh 'docker push $IMAGE_NAME'
      }
    }

    stage('Deploy Container') {
      steps {
        sh '''
          docker pull $IMAGE_NAME

          docker stop nodeapp || true
          docker rm nodeapp || true

          docker run -d --name nodeapp -p 80:3000 $IMAGE_NAME
        '''
      }
    }

  }

  post {
    success {
      echo 'Application deployed successfully!'
    }
    failure {
      echo 'Deployment failed.'
    }
  }
}
