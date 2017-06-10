const test = require('tape');
const translate = require(__dirname + '/emoji-translate.js');

test('isMaybeAlreadyAnEmoji', function (t) {
  t.equal(translate.isMaybeAlreadyAnEmoji('batman'), false, 'batman is not an emoji');
  t.equal(translate.isMaybeAlreadyAnEmoji('🐳'), true, '🐳 is an emoji');
  t.equal(translate.isMaybeAlreadyAnEmoji('🤞🏿'), true, '🤞🏿 is an emoji');
  t.equal(translate.isMaybeAlreadyAnEmoji('👩🏽‍🏫'), true, '👩🏽‍🏫 is an emoji');
  t.end();
});

test('getAllEmojiForWord', function (t) {
  t.equal(translate.getAllEmojiForWord('👀')[0], '👀', '👀 is translated to 👀');
  let allCats = translate.getAllEmojiForWord('cat');
  t.equal(allCats.length > 2, true, 'cat is translated to many things');
  t.equal(allCats.indexOf('🐱') !== -1, true, 'cat is translated to 🐱');
  t.equal(allCats.indexOf('🙀') !== -1, true, 'cat is translated to 🙀');
  t.equal(allCats.indexOf('👻') === -1, true, 'cat is not translated to 👻');
  t.end();
});

test('getEmojiForWord', function (t) {
  t.equal(translate.getEmojiForWord('👀'), '👀', '👀 is translated to 👀');
  let allCats = translate.getAllEmojiForWord('cat');
  let translatedCat = translate.getEmojiForWord('cat');
  t.equal(typeof(translatedCat) === "string", true, 'cat is translated to a string');
  t.equal(allCats.indexOf(translatedCat) !== -1, true, 'cat is translated to something in the list');
  t.end();
});

test('translate', function (t) {
  let sentence = "the house is on fire and the cat is eating the cake";
  let translatedWithWords = translate.translate(sentence);
  let translatedWithoutWords = translate.translate(sentence, true);
  t.equal(translatedWithWords !== '', true, 'sentence can be translated to something with words');
  t.equal(translatedWithoutWords !== '', true, 'sentence can be translated to something without words');
  t.equal(translatedWithWords !== translatedWithoutWords, true, 'those two things are different');

  t.end();
});