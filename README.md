# randomQuotes

## The project

This is a random quotes generator app.

- It fetches and filters the quotes from an api.
- It displays a random quote and the random quote's author if there is one.
- You can tweet the current quote by clicking on the tweet element.
- The element is always centered.

## Development

### Technologies

The technologies I used to develop this app are:

- CSS:
  It is implemented to style and animate the elements of the app and give the user feedback and interactivity.

- Javascript:
  It is implemented to fetch the api for more quotes and to assign the quotes.

- React:
  It implements React with classes, It is used to keep track of the the status of data to be rendered and displayed to the user.

- Redux:
  It is used to manage and keep track of the quotes history to ensure that the quotes are random every time the user interacts with the application.

### Challenges

- Implementing redux was the biggest challenge I had to go step by step making sure everything worked fine so the aplication could be scalable with any amount of quotes.

- Implementing the filters was fun, I used react hooks to get the input and create the filters array which i later used with regex and string match to filter by either author or a quote containing that text

### What I would do different if I do it again

- I would use React hooks and functional components.
