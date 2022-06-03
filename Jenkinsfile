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

         stage("Test") {
            steps {
                script {
                    gv.testApp()
                }
            }
        }

        stage("Build Docker image") {
            steps {
                script {
                    gv.buildImage()
                }
            }
        }
        stage("Deploy") {
            steps {
                script {
                    gv.deployApp()
                }
            }
        }
    }   
}