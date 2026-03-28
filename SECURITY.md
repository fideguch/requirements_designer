# Security Policy

## Reporting Vulnerabilities

If you discover a security vulnerability in this skill, please report it responsibly:

1. **Do not** open a public GitHub issue for security vulnerabilities
2. Email the maintainer directly or use GitHub's private vulnerability reporting feature
3. Include a clear description of the vulnerability, steps to reproduce, and potential impact
4. Allow reasonable time for a fix before any public disclosure

## Scope

This skill (`requirements_designer`) generates requirements documents through an interactive Q&A workflow. Security considerations include:

### Sensitive Business Information

- Generated documents (`designs/` directory) may contain **confidential business requirements**, product strategy, competitive analysis, and internal roadmaps
- The `templates/README_charter.md` output includes project scope, stakeholders, and rejected scope with reasons
- Quality rubric scores and improvement recommendations may reveal internal product maturity

### Data Handling

- This skill reads project files (README.md, package.json, source code) during the project scan phase to detect maturity level
- No data is transmitted externally — all processing is local
- When Enhance mode uses `WebSearch`/`WebFetch`, standard MCP security policies apply

### Recommendations

- Add `designs/` to `.gitignore` if the repository is public
- Review generated documents before sharing outside the organization
- Do not commit `workflow_config.md` with sensitive phase skip reasons to public repositories

## Supported Versions

| Version | Supported |
| ------- | --------- |
| Latest  | Yes       |

## Dependencies

Run `npm audit` regularly to check for known vulnerabilities in dependencies. The CI pipeline includes `npm audit --audit-level=high` as a quality gate.
