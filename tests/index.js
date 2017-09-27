// Skip execution in Node
console.info(__dirname);
if ( module.hot ) {
  const context = require.context(
    'mocha-loader!./../app/', // Process through mocha-loader
    true, // recursive processing
    /\.test.js$/, // Pick only files ending with .test.js
  );

  // Execute each test suite
  context.keys().forEach( context );
}
