module.exports = {
    'root': true,
    'parser': 'babel-eslint',
    'parserOptions': {
        'sourceType': 'module'
    },
    'extends': 'standard',
    'rules': {

        'arrow-parens': 0,
        'generator-star-spacing': 0,
        'indent': 0,
        'semi': ['error', 'always'],
        'eol-last': 0,
        'new-cap': ['error',
            {
                'newIsCapExceptions': ['tingle']
            }
        ],
        'no-irregular-whitespace': 0,
        'spaced-comment': 0,
        'one-var': 0,
        'no-undef': 0,
        'no-new': 0,
            'space-before-function-paren': ['error', {
            'anonymous': 'always',
            'named': 'ignore',
            'asyncArrow': 'always'
        }],
    },
    'globals': {
        '$': true,
        '_': true,
        'srcSet': true
    }
};
