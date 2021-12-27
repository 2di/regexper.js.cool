import javascript from '../../../src/js/parser/javascript/parser.js';
import _ from 'lodash';

describe('parser/javascript/anchor.js', function() {

  _.forIn({
    '^': {
      label: '行开始'
    },
    '$': {
      label: '行结束'
    }
  }, (content, str) => {
    it(`parses "${str}" as an Anchor`, function() {
      var parser = new javascript.Parser(str);

      expect(parser.__consume__anchor()).toEqual(jasmine.objectContaining(content));
    });
  });

});
