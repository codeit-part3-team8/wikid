# Test Suite Summary for README.md

## Overview

This document summarizes the comprehensive test suite created for validating the README.md documentation file that was modified in the current branch compared to the `dev` base branch.

## Changes Detected

**File Modified:** `README.md`

**Type of Changes:**
- Documentation restructuring and improvements
- Updated branch naming conventions to include issue numbers
- Updated commit convention references to link to external documentation
- Changed deployment URL path from `typo_color` to `typo-color` (kebab-case)
- Enhanced PR rules documentation with GitHub automation details
- Improved development rules section with references to CODE_CONVENTION.md

## Test Suite Created

### Files Created

1. **jest.config.js** - Jest test framework configuration
2. **jest.setup.js** - Global test setup file
3. **__tests__/docs/readme.test.ts** - Main README validation (120+ tests)
4. **__tests__/docs/documentation-links.test.ts** - Cross-reference validation (15+ tests)
5. **__tests__/docs/markdown-quality.test.ts** - Markdown quality checks (35+ tests)

### Test Coverage Details

#### 1. File Structure Tests (4 tests)
- ✅ File existence validation
- ✅ UTF-8 encoding verification
- ✅ Minimum content length requirements
- ✅ Empty file detection

#### 2. Required Sections (11 tests)
Validates presence of all major documentation sections:
- Project title/header
- "소개" (Introduction) section
- "기술 스택" (Tech Stack) section
- "Team" section
- "디렉토리 구조" (Directory Structure) section
- "Starting" (Setup) section
- "개발 규칙" (Development Rules) section
- "Git 가이드라인" (Git Guidelines) section
- "PR 규칙" (PR Rules) section
- "디자인 시스템" (Design System) section
- "링크" (Links) section

#### 3. Badge Validation (6 tests)
- shields.io badge presence
- Next.js, TypeScript, Tailwind CSS, CodeRabbit badges
- HTTPS URL enforcement
- Badge format validation

#### 4. Link Validation (9 tests)
- Markdown link syntax validation
- Internal documentation link format (./docs/*.md)
- CODE_CONVENTION.md and COMMIT_CONVENTION.md references
- External link HTTPS enforcement
- GitHub repository link validation
- Figma design link validation

#### 5. Code Block Validation (4 tests)
- Language identifier presence
- Bash/shell code blocks for installation instructions
- Proper code block closure (matching backticks)
- Non-empty code block content

#### 6. Branch Naming Convention (5 tests)
**Validates the new naming convention introduced in this branch:**
- Feature branch format: `feature/#이슈번호-기능-디테일`
- Hotfix branch format: `hotfix/#이슈번호-버그-설명`
- Release branch format: `release/v버전번호`
- Issue number inclusion in examples
- Issue creation requirement mention

#### 7. Commit Convention (4 tests)
**Validates the updated commit convention section:**
- COMMIT_CONVENTION.md reference
- Commit message format with issue numbers
- Commit type documentation (feat, fix, docs, etc.)
- commitlint validation mention

#### 8. Development Rules (7 tests)
**Validates the restructured development rules section:**
- CODE_CONVENTION.md reference
- Core naming rules documentation
- File naming conventions (PascalCase/kebab-case)
- Styling rules with Tailwind
- ESLint, Prettier, and Husky mentions

#### 9. Tech Stack Documentation (7 tests)
- Next.js, TypeScript, Tailwind CSS listing
- ESLint and Prettier documentation
- Vercel deployment platform
- **Version information (v1.0.0) validation**

#### 10. Design System Documentation (4 tests)
- Color system documentation
- Typography documentation
- **Showcase page URL validation (typo-color, not typo_color)**
- Kebab-case enforcement

#### 11. PR Rules Documentation (7 tests)
**Validates the enhanced PR rules section:**
- CodeRabbit integration mention
- PR checklist presence
- Test completion requirement
- Code review approval requirement
- **GitHub automation features (Issue templates, PR templates)**

#### 12. Content Quality (4 tests)
- No trailing whitespace
- No multiple consecutive blank lines
- Consistent heading levels
- Proper heading spacing

#### 13. Installation Instructions (5 tests)
- npm install command
- npm run dev command
- npm run build command
- npm run lint command
- type-check script

#### 14. Git Workflow Documentation (4 tests)
- Branch hierarchy (main/dev)
- Feature branch workflow
- Hotfix workflow
- Release workflow

#### 15. Emoji Usage (3 tests)
- Emoji presence in section headers
- Team section emoji
- Consistent emoji style

#### 16. Cross-Reference Validation (15+ tests)
- docs directory existence
- Referenced file existence (CODE_CONVENTION.md, COMMIT_CONVENTION.md)
- Local file reference integrity
- GitHub link format
- Figma link format
- shields.io URL format
- Version number consistency
- Project name consistency
- Repository name consistency
- npm command format
- git command format

#### 17. Markdown Quality (35+ tests)
- Heading hierarchy (single H1, proper nesting)
- List formatting (consistent markers, proper indentation)
- Code block quality (language identifiers, valid content)
- Link quality (descriptive text, alt text)
- Typography (no excessive punctuation, proper emphasis)
- Table formatting (headers, alignment)
- Accessibility (alt text, descriptive headings)
- Performance (file size < 100KB, line length < 200 chars)

## Key Testing Improvements for This Branch

The test suite specifically validates the improvements made in this branch:

1. **Branch Naming with Issue Numbers**
   - Tests ensure the new format `feature/#12-login-form` is documented
   - Validates requirement for issue creation before branching

2. **External Documentation References**
   - Tests verify links to CODE_CONVENTION.md and COMMIT_CONVENTION.md
   - Ensures referenced files actually exist

3. **Kebab-Case URL Consistency**
   - Tests validate the change from `typo_color` to `typo-color`
   - Ensures consistency with project conventions

4. **Enhanced Automation Documentation**
   - Tests verify mention of Issue templates
   - Tests verify mention of PR templates
   - Tests verify CodeRabbit AI review system

5. **Vercel Deployment Version**
   - Tests validate the "v1.0.0부터 시작" notation
   - Ensures deployment information is accurate

## Technology Stack

- **Jest 29.7.0**: Test runner and assertion framework
- **@swc/jest 0.2.29**: Fast TypeScript transpilation
- **TypeScript 5**: Type-safe test code
- **Node.js**: Test execution environment

## Package.json Updates

### New Scripts
```json
{
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "test:ci": "jest --ci --coverage --maxWorkers=2"
}
```

### New Dependencies
```json
{
  "devDependencies": {
    "jest": "^29.7.0",
    "@swc/jest": "^0.2.29",
    "@types/jest": "^29.5.11",
    "jest-environment-node": "^29.7.0"
  }
}
```

## Running the Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Watch Mode (Development)
```bash
npm run test:watch
```

### Generate Coverage Report
```bash
npm run test:coverage
```

### CI/CD Mode
```bash
npm run test:ci
```

## Expected Test Results

When you run `npm test`, you should see: