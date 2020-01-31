module.exports = {
  root: true,
  plugins: ['node', 'fp', 'ramda'],
  extends: ['plugin:fp/recommended', 'prettier'],
  env: {
    node: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'no-var': 'error',
    'max-len': ['error', 110],
    'node/no-unpublished-require': 'off',
    'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: false }],
    'fp/no-mutation': [
      'error',
      {
        commonjs: true,
        allowedObjects: ['_', 'R', 'fp']
      }
    ],
    'ramda/always-simplification': 'error',
    'ramda/any-pass-simplification': 'error',
    'ramda/both-simplification': 'error',
    'ramda/complement-simplification': 'error',
    'ramda/compose-simplification': 'error',
    'ramda/cond-simplification': 'error',
    'ramda/either-simplification': 'error',
    'ramda/eq-by-simplification': 'error',
    'ramda/filter-simplification': 'error',
    'ramda/if-else-simplification': 'error',
    'ramda/map-simplification': 'error',
    'ramda/merge-simplification': 'error',
    'ramda/no-redundant-and': 'error',
    'ramda/no-redundant-not': 'error',
    'ramda/no-redundant-or': 'error',
    'ramda/pipe-simplification': 'error',
    'ramda/prefer-both-either': 'error',
    'ramda/prefer-complement': 'error',
    'ramda/prefer-ramda-boolean': 'error',
    'ramda/prop-satisfies-simplification': 'error',
    'ramda/reduce-simplification': 'error',
    'ramda/reject-simplification': 'error',
    'ramda/set-simplification': 'error',
    'ramda/unless-simplification': 'error',
    'ramda/when-simplification': 'error',
    'node/exports-style': ['error', 'module.exports']
  }
}
