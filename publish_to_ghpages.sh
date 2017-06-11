#!/bin/sh

# post-commit hook:
# #!/bin/sh
#
# #unset GIT_INDEX_FILE to fix fatal: Unable to create 'p4davan/public/.git/index.lock': No such file or directory
# unset GIT_INDEX_FILE
# # get the branch and store it in a variable.
# branch=`git rev-parse --symbolic-full-name --abbrev-ref HEAD`
#
# # I only want to "do stuff" if we're on the master branch
# if [ "$branch" = "master" ]
# then
#     # the makefile does all the publishing and is explained below.
#     #make publish
#     cd /d/project/p4davan/p4davan
#     ./publish_to_ghpages.sh
# fi

DIR=$(dirname "$0")

GIT_CMD="git"

cd $DIR

if [[ $(git status -s) ]]
then
    echo "The working directory is dirty. Please commit any pending changes."
    exit 1;
fi

echo -e "\033[0;32mDeleting old publication\033[0m"
rm -rf public
mkdir public
$GIT_CMD worktree prune
rm -rf .git/worktrees/public/

echo -e "\033[0;32mChecking out gh-pages branch into public\033[0m"
$GIT_CMD worktree add -B gh-pages public origin/gh-pages

echo -e "\033[0;32mRemoving existing files\033[0m"
rm -rf public/*

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"
# Build the project.
hugo # if using a theme, replace by `hugo -t <yourtheme>`

# Go To Public folder
cd public
# Add changes to git.
echo -e "\033[0;32mAdd changes to git.\033[0m"
$GIT_CMD add -A

# Commit changes.
echo -e "\033[0;32mCommit changes.\033[0m"
msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
$GIT_CMD commit -m "$msg"

echo -e "\033[0;32mPush source repo.\033[0m"
# Push source and build repos.
$GIT_CMD push origin master

echo -e "\033[0;32mPush gh-pages repo.\033[0m"
$GIT_CMD push origin gh-pages

# Come Back
cd $DIR
echo -e "\033[0;32mDone.\033[0m"
