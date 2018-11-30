# Decider Front End

## About 

This application is the UI layer for the Decider app at https://github.com/magentanova/decider. It provides a visual interface for the question-answering/token-advancement functionality exposed by Decider. 

While the mechanics of Decider can be adapted to any paradigm, this app presents us with the playful scenario of a monarch hearing requests and nonchalantly waving a hand in the direction of "yes" or "no". The monarch's job isn't all that easy, though, as each decision will affect the crown's approval rating with one of multiple factions within the kingdom. These escalating and decreasing approval ratings are visualized as meters that fill and empty. The color of the meter becomes greener the fuller it gets and redder the emptier it gets. 

This app also takes the monarch's picture after each question, processes it with a GLSL shader, then displays the royal portrait for a few seconds before sending it to the back end. 

## Running Locally

Note that in order for the project to run locally, you should have the back-end application for Decider running on the same machine. If you run `yarn start`, this app will assume that the back-end server is running on `localhost:5000`, which is the default for that app when run with `python run.py`. 

  - `cd` into the project root. 
  - `yarn install` 
  - `yarn start`

## Using the UI 

Pretty straightforward. Drag the crown into one of the two zones positioned below it. After that, your picture will be taken. Then you'll see the meters fill again. A new question will appear. See above. 