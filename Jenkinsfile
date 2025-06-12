pipeline {
    agent any
    
    stages {
        stage('Clone Code') {
            steps {
                git branch: 'main', url: 'https://github.com/SamNguyen228/Tic_Tac_Toe.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage ('Publish') {
		steps {
			echo 'public 2 runnig folder'
		//iisreset /stop // stop iis de ghi de file 
			bat 'xcopy "%WORKSPACE%" /E /Y /I /R "c:\\myproject"'
 		    }
	    }

    }
}
