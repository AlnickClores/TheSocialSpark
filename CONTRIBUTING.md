# Contributing to M.A.R - Menu Augmented Resto

## Setup and Installation

To get started with the development, you need to setup your local environemnent first:

1. Fork the repository to create a personal copy of this repository.
2. Clone the forked repository:

```bash
git clone url-of-original-repository
```

3. Navigate to the cloned project directory and install the required dependencies:

```bash
cd repository-name
npm install
```

## Making Changes

1. Create a new git branch:

```bash
git checkout -b branch-name
```

2. Make your changes.
3. Test your changes, make sure that they work correctly.
4. Commit your changes:

```bash
git add .
git commit -m "Description of changes you made."
```

5. Push the changes:

```bash
git push origin branch-name
```

6. Submit a pull request. Go to original repository on GitHub and submit a pull request from your forked repository.

## Keeping your forked repository up to date

This repository may be updated at any time, and your local copy might become outdated or overridden by pull requests from other developers.

1. Navigate to your cloned repository:

```bash
cd repository-name
```

2. Add the original repository as remote:

```bash
git remote add upstream url-of-original-repository
```

3. Fetch the latest changes:

```bash
git fetch upstream
```

4. Merge the changes into your local branch:

```bash
git checkout main
```
