let story = 'Last weekend, I took literally the most beautiful bike ride of my life. The route is called "The 9W to Nyack" and it actually stretches all the way from Riverside Park in Manhattan to South Nyack, New Jersey. It\'s really an adventure from beginning to end! It is a 48 mile loop and it basically took me an entire day. I stopped at Riverbank State Park to take some extremely artsy photos. It was a short stop, though, because I had a really long way left to go. After a quick photo op at the very popular Little Red Lighthouse, I began my trek across the George Washington Bridge into New Jersey.  The GW is actually very long - 4,760 feet! I was already very tired by the time I got to the other side.  An hour later, I reached Greenbrook Nature Sanctuary, an extremely beautiful park along the coast of the Hudson.  Something that was very surprising to me was that near the end of the route you actually cross back into New York! At this point, you are very close to the end. My worlds it my work work work work work work work';

const linterWorlds = (story) => {
  const unnecessaryWords = ['the', 'to', 'a', 'an', 'it', 'at', 'of', 'is', 'and']
  let counter = 0
  let length = 0

  const storyWords = story.split(' ')
    .reduce((result, word) => {
      const text = word.replace(/\.|!|,|-$/gm, '').toLowerCase()

      if (isNaN(text)) {
        length++;
        if (!unnecessaryWords.includes(text)) 
          result[text] = result[text] + 1 || 1;
      }

      if (['.', '!'].includes(word[word.length - 1]))
        counter++;

      return result;
  }, {});

  return {
    counter,
    length,
    originalityWords: () => Object.keys(storyWords).length,
    overusedWords: (length = 100) => {
      return Object.entries(storyWords)
        .sort(([keyA, a], [keyB, b]) => b - a)
        .filter((enri, i) => i < length)
        .map(([key, value]) => {
            const space = (text, numb, mark = '-') => Array.from({ length: numb - text.toString().length })
              .join(mark)
            return `| - ${key} ${space(key, 15)} | ${space(value, 7)} ${value} - |`
        })
        .join('\n')
    },
  }
}


const logInfo = ({ length, counter, originalityWords, overusedWords }) => {
    console.log(`Word count: ${length}`)
    console.log(`Sentence count: ${counter}`)
    console.log(`Uniqu Length count: ${originalityWords()}`)
    console.log(`The number of times each overused word appears:\n${overusedWords(5)}`)
}

const myStory = linterWorlds(story)

logInfo(myStory)

