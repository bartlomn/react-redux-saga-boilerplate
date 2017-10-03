const gitRevision = require( 'git-revision' );

const GIT_REVISION = gitRevision( 'tag' );

module.exports = {
  GIT_REVISION,
};
