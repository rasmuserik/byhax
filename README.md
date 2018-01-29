# byhax

An app for communities, festivals, etc. Starting out with a calendar for tinkuy.dk

Roadmap:

- Version 0.0.1:
    - [ ] set up app infrastructure
        - [x] repository
        - [x] simple deployment
        - [x] i18n (da/en)
        - [x] deploy to byhax.com
        - [x] material-ui@next
        - [ ] ci
        - [ ] coverage
        - [ ] waffle-board
        - [x] api.byhax.com for data (simple pouchdb-server, with tinkuy-data)
        - [ ] contributing etc.
        - [ ] package.json repository links etc
        - [x] deploy to byhax.dk
    - [ ] fix db loading, to wait on-changes until after first sync.
    - [ ] mobile friendly easy/offline event calendar(list) with data for tinkuy.dk/events
- Version 0.0.2:
    - [ ] login with tinkuy-login
    - [ ] show profile
- Version 0.0.3:
    - [ ] event calendar - desktop/week
- Version 0.0.4:
    - [ ] book room
- Version 0.0.5:
    - [ ] port/add to other community

# Design choices

- use single design across platform, follow material-design guidelines
- model data entities after schema.org and dublin-core, where it makes sense
- build as simple web-app
- `pouchdb` for sync/offline state, mirror relevant parts into `immutable` `redux` state
    - database per community, and per user
- unit testing and coverage
- reduce number of dependencies
- code formatting: prettier

## Design of redux state

Synced to two pouchdbs: `community`(sync'ed with server) and `user`

- `events` (sync'ed to community-pouch, modelled after schema.org/Event) 
    - startDate:
    - endDate:
    - name:
    - description:
    - image:
    - location:
    - itemtype: one of BusinessEvent ChildrensEvent ComedyEvent CourseInstance DanceEvent DeliveryEvent EducationEvent ExhibitionEvent Festival FoodEvent LiteraryEvent MusicEvent PublicationEvent SaleEvent ScreeningEvent SocialEvent SportsEvent TheaterEvent VisualArtsEvent Event
    - keywords (not on events, but typical naming in schema/dc).
- `ui` ephemeral state, not synced
- `user` (synced to user-pouch)
    - `me` modelled after schema.org/Person
    - `byhaxAppSettings`
