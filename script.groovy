def testApp() {
    echo "Testing the application ..."  
} 


def buildImage() {
    echo "building the docker image..."
    withCredentials([usernamePassword(credentialsId: 'DockerHub-credentials', passwordVariable: 'PASS', usernameVariable: 'USER')]) {


        sh 'docker build -f api-gateway/Dockerfile -t mahdibouaziz/api-gateway .'
        sh "echo $PASS | docker login -u $USER --password-stdin"
        sh 'docker push mahdibouaziz/api-gateway'
    }
} 

def deployApp() {
    echo 'deploying the application...'
} 

return this