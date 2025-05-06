@echo off
echo Deploying to GitHub Pages...

git add .
git commit -m "Update for GitHub Pages deployment"
git push origin master

echo Deployment process initiated. Check GitHub Actions for progress.
echo Visit your repository's Actions tab to monitor the deployment.
pause
