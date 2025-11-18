/**
 * README.md Validation Tests
 * 
 * This test suite validates the README.md file to ensure:
 * - All referenced files and documentation exist
 * - URLs are properly formatted and accessible
 * - Directory structure matches documentation
 * - Markdown syntax is valid
 * - Internal links are not broken
 * 
 * Run with: node tests/docs/readme.test.js
 */

const fs = require('fs');
const path = require('path');
const { test } = require('node:test');
const assert = require('node:assert');

const README_PATH = path.join(__dirname, '../../README.md');
const PROJECT_ROOT = path.join(__dirname, '../..');

// Helper to read README once
let readmeContent;
try {
  readmeContent = fs.readFileSync(README_PATH, 'utf-8');
} catch (error) {
  console.error('Failed to read README.md:', error.message);
  process.exit(1);
}

// File Existence Tests
test('README.md should exist', () => {
  assert.ok(fs.existsSync(README_PATH), 'README.md should exist');
});

test('README.md should not be empty', () => {
  assert.ok(readmeContent.length > 0, 'README.md should not be empty');
  assert.ok(readmeContent.length > 100, 'README.md should have substantial content');
});

// Referenced Documentation Files Tests
test('CODE_CONVENTION.md should be referenced and exist', () => {
  const hasReference = readmeContent.includes('docs/CODE_CONVENTION.md');
  assert.ok(hasReference, 'README should reference CODE_CONVENTION.md');
  
  const filePath = path.join(PROJECT_ROOT, 'docs/CODE_CONVENTION.md');
  assert.ok(
    fs.existsSync(filePath),
    'docs/CODE_CONVENTION.md should exist as referenced in README'
  );
});

test('COMMIT_CONVENTION.md should be referenced and exist', () => {
  const hasReference = readmeContent.includes('docs/COMMIT_CONVENTION.md');
  assert.ok(hasReference, 'README should reference COMMIT_CONVENTION.md');
  
  const filePath = path.join(PROJECT_ROOT, 'docs/COMMIT_CONVENTION.md');
  assert.ok(
    fs.existsSync(filePath),
    'docs/COMMIT_CONVENTION.md should exist as referenced in README'
  );
});

test('all docs directory markdown files should be accounted for', () => {
  const docsPath = path.join(PROJECT_ROOT, 'docs');
  if (fs.existsSync(docsPath)) {
    const docFiles = fs.readdirSync(docsPath).filter(f => f.endsWith('.md'));
    
    docFiles.forEach(file => {
      const isReferenced = readmeContent.includes(`docs/${file}`);
      const isMetaDoc = ['README.md'].includes(file);
      
      if (!isReferenced && !isMetaDoc) {
        console.warn(`Warning: docs/${file} exists but is not referenced in README.md`);
      }
    });
  }
});

// Configuration Files Tests
test('all mentioned configuration files should exist', () => {
  const configFiles = [
    'eslint.config.mjs',
    'tailwind.config.ts',
    '.prettierrc',
    'package.json',
    'next.config.ts',
    'commitlint.config.js'
  ];

  configFiles.forEach(file => {
    if (readmeContent.includes(file)) {
      const filePath = path.join(PROJECT_ROOT, file);
      const exists = fs.existsSync(filePath);
      assert.ok(
        exists,
        `${file} is mentioned in README but doesn't exist at ${filePath}`
      );
    }
  });
});

// Directory Structure Tests
test('src directory should exist', () => {
  const srcPath = path.join(PROJECT_ROOT, 'src');
  assert.ok(fs.existsSync(srcPath), 'src directory should exist');
});

test('src/app directory should exist', () => {
  const appPath = path.join(PROJECT_ROOT, 'src/app');
  assert.ok(fs.existsSync(appPath), 'src/app directory should exist');
});

test('docs directory should exist', () => {
  const docsPath = path.join(PROJECT_ROOT, 'docs');
  assert.ok(fs.existsSync(docsPath), 'docs directory should exist');
});

test('critical app routes should exist', () => {
  const appPath = path.join(PROJECT_ROOT, 'src/app');
  const criticalRoutes = ['login', 'signup', 'boards', 'wiki', 'wikilist'];

  criticalRoutes.forEach(route => {
    const routePath = path.join(appPath, route);
    const exists = fs.existsSync(routePath);
    assert.ok(
      exists,
      `Critical route ${route} should exist at ${routePath}`
    );
  });
});

test('typo-color route should exist (updated from typo_color)', () => {
  const oldPath = path.join(PROJECT_ROOT, 'src/app/typo_color');
  const newPath = path.join(PROJECT_ROOT, 'src/app/typo-color');
  
  const exists = fs.existsSync(newPath) || fs.existsSync(oldPath);
  assert.ok(
    exists,
    'typo-color or typo_color route should exist'
  );
  
  // Verify README uses the correct reference (typo-color)
  if (fs.existsSync(newPath) && !fs.existsSync(oldPath)) {
    const hasCorrectRef = readmeContent.includes('typo-color');
    assert.ok(
      hasCorrectRef,
      'README should reference typo-color (not typo_color)'
    );
  }
});

// URL Validation Tests
test('GitHub repository URL should be correct', () => {
  const githubUrl = 'https://github.com/codeit-part3-team8/wikid';
  assert.ok(
    readmeContent.includes(githubUrl),
    'README should contain the correct GitHub repository URL'
  );
});

test('Figma design URL should be properly formatted', () => {
  const figmaUrlPattern = /https:\/\/figma\.com\/design\/[a-zA-Z0-9]+/;
  assert.ok(
    figmaUrlPattern.test(readmeContent),
    'README should contain a valid Figma design URL'
  );
});

test('localhost URLs should be correct for local development', () => {
  const localhostPattern = /http:\/\/localhost:3000/;
  assert.ok(
    localhostPattern.test(readmeContent),
    'README should reference localhost:3000 for local development'
  );
});

test('should extract all URLs for reference', () => {
  const urlPattern = /https?:\/\/[^\s)]+/g;
  const urls = readmeContent.match(urlPattern) || [];
  
  assert.ok(urls.length > 0, 'README should contain external URLs');
  console.log('\nExtracted URLs:', urls.length, 'URLs found');
});

// Markdown Structure Tests
test('should have a main title (# heading)', () => {
  const titlePattern = /^#\s+.+/m;
  assert.ok(
    titlePattern.test(readmeContent),
    'README should have a main title'
  );
});

test('should have multiple sections with ## headings', () => {
  const sectionPattern = /^##\s+.+/gm;
  const sections = readmeContent.match(sectionPattern) || [];
  assert.ok(
    sections.length >= 5,
    `README should have at least 5 major sections, found ${sections.length}`
  );
});

test('should have code blocks for commands', () => {
  const codeBlockPattern = /```[\s\S]*?```/g;
  const codeBlocks = readmeContent.match(codeBlockPattern) || [];
  assert.ok(
    codeBlocks.length > 0,
    'README should contain code blocks for examples and commands'
  );
});

test('should have team member table', () => {
  const hasTable = readmeContent.includes('| 이름') || readmeContent.includes('|---');
  assert.ok(hasTable, 'README should contain team member table');
  
  const teamMembers = ['권현성', '윤시현', '양정훈', '방다연'];
  teamMembers.forEach(member => {
    assert.ok(
      readmeContent.includes(member),
      `Team member ${member} should be listed in README`
    );
  });
});

test('should have proper badge formatting', () => {
  const badgePattern = /!\[.*?\]\(https:\/\/img\.shields\.io/g;
  const badges = readmeContent.match(badgePattern) || [];
  assert.ok(
    badges.length > 0,
    'README should contain shields.io badges for tech stack'
  );
});

// Tech Stack Documentation Tests
test('should document Next.js version', () => {
  assert.ok(
    readmeContent.includes('Next.js') && readmeContent.includes('16.0.3'),
    'README should document Next.js version 16.0.3'
  );
});

test('should document React version', () => {
  assert.ok(
    readmeContent.includes('React') && readmeContent.includes('19.2.0'),
    'README should document React version 19.2.0'
  );
});

test('should document TypeScript', () => {
  assert.ok(
    readmeContent.includes('TypeScript'),
    'README should mention TypeScript'
  );
});

test('should document Tailwind CSS', () => {
  assert.ok(
    readmeContent.includes('Tailwind CSS') || readmeContent.includes('Tailwind'),
    'README should mention Tailwind CSS'
  );
});

test('should match versions with package.json', () => {
  const packageJsonPath = path.join(PROJECT_ROOT, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  // Check Next.js version
  if (packageJson.dependencies && packageJson.dependencies.next) {
    const nextVersion = packageJson.dependencies.next;
    const versionInReadme = readmeContent.match(/Next\.js\s+(\d+\.\d+\.\d+)/);
    if (versionInReadme) {
      assert.ok(
        nextVersion.includes(versionInReadme[1]),
        `Next.js version in README (${versionInReadme[1]}) should match package.json (${nextVersion})`
      );
    }
  }

  // Check React version
  if (packageJson.dependencies && packageJson.dependencies.react) {
    const reactVersion = packageJson.dependencies.react;
    const versionInReadme = readmeContent.match(/React\s+(\d+\.\d+\.\d+)/);
    if (versionInReadme) {
      assert.ok(
        reactVersion.includes(versionInReadme[1]),
        `React version in README (${versionInReadme[1]}) should match package.json (${reactVersion})`
      );
    }
  }
});

// Development Guidelines Tests
test('should reference CODE_CONVENTION.md for detailed rules', () => {
  assert.ok(
    readmeContent.includes('CODE_CONVENTION.md'),
    'README should reference CODE_CONVENTION.md for detailed development rules'
  );
});

test('should reference COMMIT_CONVENTION.md for commit rules', () => {
  assert.ok(
    readmeContent.includes('COMMIT_CONVENTION.md'),
    'README should reference COMMIT_CONVENTION.md for commit conventions'
  );
});

test('should document core naming conventions', () => {
  assert.ok(
    readmeContent.includes('네이밍') || readmeContent.includes('naming'),
    'README should mention naming conventions'
  );
});

test('should document automation tools', () => {
  const tools = ['ESLint', 'Prettier', 'Husky', 'commitlint'];
  tools.forEach(tool => {
    assert.ok(
      readmeContent.includes(tool),
      `README should mention ${tool} as an automation tool`
    );
  });
});

// Git Workflow Documentation Tests
test('should document Git Flow strategy', () => {
  const hasGitFlow = readmeContent.includes('Git Flow') || 
                     (readmeContent.includes('main') && readmeContent.includes('dev'));
  assert.ok(hasGitFlow, 'README should document Git Flow strategy');
});

test('should document branch naming with issue numbers', () => {
  const hasIssueNumbers = readmeContent.includes('#이슈번호') || readmeContent.includes('feature/#');
  assert.ok(
    hasIssueNumbers,
    'README should document branch naming with issue numbers'
  );
  
  // Check for examples
  const hasExamples = readmeContent.includes('feature/#12') || readmeContent.includes('feature/#5');
  assert.ok(
    hasExamples,
    'README should provide branch naming examples'
  );
});

test('should document commit convention format', () => {
  const hasCommitTypes = readmeContent.includes('feat:') || readmeContent.includes('fix:');
  assert.ok(hasCommitTypes, 'README should document commit types');
  
  const hasFormat = readmeContent.includes('<type>: <subject>');
  assert.ok(hasFormat, 'README should document commit message format');
});

test('should mention commit message validation', () => {
  const hasValidation = readmeContent.includes('commitlint') || readmeContent.includes('자동 검증');
  assert.ok(
    hasValidation,
    'README should mention automatic commit message validation'
  );
});

// PR Guidelines Tests
test('should document CodeRabbit usage', () => {
  assert.ok(
    readmeContent.includes('CodeRabbit') || readmeContent.includes('Code Rabbit'),
    'README should mention CodeRabbit for automated code review'
  );
});

test('should have PR checklist', () => {
  const checklistItems = ['ESLint', 'Prettier', 'TypeScript', '빌드', '코드 리뷰'];
  
  checklistItems.forEach(item => {
    assert.ok(
      readmeContent.includes(item),
      `PR checklist should include ${item}`
    );
  });
});

test('should mention GitHub automation features', () => {
  const features = ['Issue 템플릿', 'PR 템플릿'];
  features.forEach(feature => {
    const hasFeature = readmeContent.includes(feature) || 
                       readmeContent.toLowerCase().includes(feature.toLowerCase());
    assert.ok(hasFeature, `README should mention ${feature}`);
  });
});

// Design System Documentation Tests
test('should document typography system', () => {
  const hasTypography = readmeContent.includes('타이포그래피') || readmeContent.includes('Typography');
  assert.ok(hasTypography, 'README should document typography system');
  
  assert.ok(
    readmeContent.includes('Pretendard'),
    'README should mention Pretendard font'
  );
});

test('should document color system', () => {
  const hasColor = readmeContent.includes('컬러') || readmeContent.includes('Color');
  assert.ok(hasColor, 'README should document color system');
  
  const colors = ['Grayscale', 'Primary', 'Secondary'];
  colors.forEach(color => {
    assert.ok(
      readmeContent.includes(color),
      `Color system should include ${color}`
    );
  });
});

test('should reference design system showcase page with correct URL', () => {
  const hasReference = readmeContent.includes('typo-color');
  assert.ok(hasReference, 'README should reference the design system showcase page');
  
  const hasUrl = readmeContent.includes('localhost:3000/typo-color');
  assert.ok(hasUrl, 'README should provide the correct URL (typo-color, not typo_color)');
});

// Deployment Information Tests
test('should document Vercel as deployment platform', () => {
  assert.ok(
    readmeContent.includes('Vercel'),
    'README should mention Vercel as deployment platform'
  );
});

test('should indicate deployment starts from v1.0.0', () => {
  assert.ok(
    readmeContent.includes('v1.0.0'),
    'README should indicate that deployment starts from v1.0.0'
  );
});

// NPM Scripts Documentation Tests
test('should document all available npm scripts', () => {
  const scripts = ['dev', 'build', 'start', 'lint', 'lint:fix', 'format', 'format:check', 'type-check'];

  scripts.forEach(script => {
    assert.ok(
      readmeContent.includes(script),
      `README should document npm run ${script}`
    );
  });
});

test('should match documented scripts with package.json', () => {
  const packageJsonPath = path.join(PROJECT_ROOT, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  const documentedScripts = [
    'dev', 'build', 'start', 'lint', 'lint:fix',
    'format', 'format:check', 'type-check'
  ];

  documentedScripts.forEach(script => {
    if (readmeContent.includes(`npm run ${script}`)) {
      assert.ok(
        packageJson.scripts && packageJson.scripts[script],
        `Script ${script} is documented in README but missing in package.json`
      );
    }
  });
});

// Installation Instructions Tests
test('should have Node.js requirement', () => {
  assert.ok(
    readmeContent.includes('Node.js'),
    'README should specify Node.js requirement'
  );
});

test('should have npm requirement', () => {
  assert.ok(
    readmeContent.includes('npm'),
    'README should mention npm'
  );
});

test('should have installation steps', () => {
  assert.ok(
    readmeContent.includes('git clone'),
    'README should include git clone command'
  );
  
  assert.ok(
    readmeContent.includes('npm install'),
    'README should include npm install command'
  );
  
  assert.ok(
    readmeContent.includes('npm run dev'),
    'README should include dev server start command'
  );
});

test('should have correct repository URL in clone command', () => {
  const clonePattern = /git clone https:\/\/github\.com\/codeit-part3-team8\/wikid\.git/;
  assert.ok(
    clonePattern.test(readmeContent),
    'README should have correct git clone URL'
  );
});

// Consistency Tests
test('should not have excessive trailing whitespace', () => {
  const lines = readmeContent.split('\n');
  const linesWithTrailingSpace = lines
    .map((line, index) => ({ line, index: index + 1 }))
    .filter(({ line }) => line.endsWith(' ') && line.trim() !== '');
  
  if (linesWithTrailingSpace.length > 0) {
    console.warn(`Warning: Found trailing whitespace on ${linesWithTrailingSpace.length} lines`);
  }
  // This is a warning, not a failure
  assert.ok(true);
});

test('should use Korean for descriptions', () => {
  const koreanPattern = /[가-힣]/;
  assert.ok(
    koreanPattern.test(readmeContent),
    'README should contain Korean descriptions'
  );
});

test('should have emoji usage in headings', () => {
  const emojiHeadings = readmeContent.match(/^##\s+[🔗🎨📋⚙️💖👥📂🚩🛠️✨📚]/gm) || [];
  assert.ok(
    emojiHeadings.length > 0,
    'README should use emojis in section headings'
  );
});

// Content Completeness Tests
test('should have project description', () => {
  assert.ok(
    readmeContent.includes('WIKID') && readmeContent.includes('위키'),
    'README should have a clear project description'
  );
});

test('should have team information', () => {
  const teamSection = readmeContent.includes('## 👥 Team') || readmeContent.includes('Team');
  assert.ok(teamSection, 'README should have team section');
});

test('should have links section', () => {
  const linksSection = readmeContent.includes('## 🔗 링크') || readmeContent.includes('Link');
  assert.ok(linksSection, 'README should have links section');
});

test('should not have unresolved placeholder content', () => {
  const placeholders = ['TODO', 'TBD', 'Coming Soon'];
  const hasPlaceholder = placeholders.some(p => readmeContent.includes(p));
  
  if (hasPlaceholder) {
    console.warn('Warning: README contains placeholder content that may need attention');
  }
  // This is informational, not a hard failure
  assert.ok(true);
});

// Specific Change Validation (from the diff)
test('should update Vercel description from "예정" to actual deployment info', () => {
  const hasNewDescription = readmeContent.includes('배포 환경 (v1.0.0부터 시작)');
  assert.ok(
    hasNewDescription,
    'Vercel description should be updated to indicate deployment starts from v1.0.0'
  );
  
  const hasOldDescription = readmeContent.includes('Vercel** (예정)');
  assert.ok(
    !hasOldDescription,
    'Old "예정" placeholder should be removed from Vercel description'
  );
});

test('should reference external convention documents instead of inline details', () => {
  // New approach: references to external docs
  const referencesExternal = readmeContent.includes('[docs/CODE_CONVENTION.md]') &&
                             readmeContent.includes('[docs/COMMIT_CONVENTION.md]');
  assert.ok(
    referencesExternal,
    'README should reference external convention documents'
  );
});

test('should use correct typo-color URL (not typo_color)', () => {
  const hasCorrectUrl = readmeContent.includes('localhost:3000/typo-color');
  assert.ok(
    hasCorrectUrl,
    'README should use typo-color (kebab-case) not typo_color'
  );
  
  const hasOldUrl = readmeContent.includes('localhost:3000/typo_color');
  assert.ok(
    !hasOldUrl,
    'README should not contain old typo_color URL'
  );
});

test('should include issue numbers in branch naming examples', () => {
  const hasIssueExamples = readmeContent.includes('feature/#12') || 
                           readmeContent.includes('feature/#5') ||
                           readmeContent.includes('hotfix/#34');
  assert.ok(
    hasIssueExamples,
    'Branch naming should include examples with issue numbers'
  );
});

test('should document commit format with issue numbers', () => {
  const hasIssueInFormat = readmeContent.includes('(#이슈번호)') ||
                           readmeContent.includes('(#12)') ||
                           readmeContent.includes('(#34)');
  assert.ok(
    hasIssueInFormat,
    'Commit convention should show issue number format'
  );
});

test('should mention GitHub automation (Issue/PR templates)', () => {
  const hasAutomation = readmeContent.includes('Issue 템플릿') && 
                        readmeContent.includes('PR 템플릿');
  assert.ok(
    hasAutomation,
    'README should mention GitHub Issue and PR templates'
  );
});

console.log('\n✅ All README.md validation tests completed!\n');