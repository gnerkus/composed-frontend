# Composed Frontend

## Motivation
### Basic set-up
![composed-frontend](/images/composed-frontend.png)
* The `host` page renders the `catalog`, `buy`, `basket` and `recos` (recommendations) components.
* The `host` page contains the application's Redux store.
* The `catalog`, `buy`, `basket` and `recos` components subscribe to events from the store and publish events to the store.

### Problems
1. The `host` page has to be aware of the other components. It controls how the components are rendered.
2. The other components cannot be used outside the `host` page. This is mostly because it holds the message bus.
3. The teams in charge of `catalog`, `buy` and `basket`, and `recos` cannot work in isolation. Changes to any of their components would affect the structure of the page and the other components.

### Solutions
1. Move the event bus (Redux) outside the `host` page. For example, the event bus could be a Redis message queue. This fixes problem 2.
2. Move the components outside the `host` page. The `host` should not be dependent on the components. This fixes problem 1.
3. Deploy the components from their own services. This fixes problem 3.

## Implementation
### Naive-SSI
This implementation involves the use of SSIs (server-side includes) from Nginx. Each service renders their HTML on the server and serves it.

* The content is rendered server-side using SSIs.
* The components do not utilize any interaction; there is no Javascript.
* There is no event bus.

Unfortunately, there is no branch in the repo that shows this implementation. It was overwritten in error. You could find it in the repo's history.

### Naive-React
This implementation builds on _Naive-SSI_ by composing each microservice's content from React components. The services do not serve HTML but Javascript.

* The content is rendered server-side using SSIs.
* The components utilize Javascript.
* There is no event bus.
* The implementation can be found in the **naive-react** branch.
* The page is rendered improperly due to multiple `<body>` and `<script>` tags at different points in the `host` HTML.

### Web-components
This implementation also builds on _Naive-SSI_ by composing each microservice's content from Web components.

* The content is rendered server-side using SSIs.
* The components utilize Javascript.
* There is no event bus.
* The implementation can be found in the **web-components** branch.
* This implementation is hugely inspired by the [micro-frontends](https://micro-frontends.org/) project. In fact, it's a shameless copy save for changes to the names of the services.
* This implementation is the closest to the requirements for the research.

### React-Redis
This implementation restricts the rendering of the components to the client; it does not utilize SSIs. The components are built using React.

* The content is rendered client-side.
* The implementation uses a Redis message queue as an event bus.
* The implementation can be found in the **master** branch.

## Setup

Starting nginx and all team containers

    docker-compose up --build

Once everything is build an running you can access the assembled product page via [http://127.0.0.1:3000/](http://127.0.0.1:3000/).

## TODOs
- [ ] Replace the Redis message queue with a more robust implementation like RabbitMQ.
- [ ] Host the microservices as apps instead of React components. This will allow the microsevices to be composed from other libraries / frameworks like Vue and Angular.
