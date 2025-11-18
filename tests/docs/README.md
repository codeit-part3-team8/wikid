# README.md Validation Tests

This directory contains comprehensive validation tests for the project's README.md documentation.

## Purpose

The README is the primary entry point for developers and users. These tests ensure:

1. **Accuracy**: All referenced files, paths, and URLs are correct and exist
2. **Completeness**: All essential sections and information are present
3. **Consistency**: Formatting, structure, and content follow project conventions
4. **Maintainability**: Changes to the project structure are reflected in documentation
5. **Quality**: Documentation remains up-to-date and valuable

## Running Tests

### Using Node.js built-in test runner (Node 18+):

```bash
# Run all tests with detailed output
node tests/docs/readme.test.js

# Run with test results summary
node --test tests/docs/readme.test.js
```

### Expected Output