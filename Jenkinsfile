def gv

pipeline {
    agent any
    stages {
        stage("init") {
            steps {
                script {
                    gv = load "script.groovy"
                }
            }
        }

         stage("test") {
            steps {
                script {
                    // echo "Testing the application"
                    gv.testApp()
                }
            }
        }

        stage("build image") {
            steps {
                script {
                    // echo "building image"
                    gv.buildImage()
                }
            }
        }
        stage("deploy") {
            steps {
                script {
                    // echo "deploying"
                    gv.deployApp()
                }
            }
        }
    }   
}