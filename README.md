# byhax

An app for communities, festivals, etc. roadmap:

- [ ] mobile friendly easy/offline event calendar with data for tinkuy.dk/events
- [ ] production deployment
- [ ] port/add to other community
- [ ] identify futher needs of actual users (both members, and back-office functionality), and expand roadmap

# Tech design choices

- build as simple web-app, but use `react-native-web`, such that it is easy to port to actual app later.
- `pouchdb` for sync/offline state, mirror relevant parts into `immutable` `redux` state
    - database per community, and per user
- use single design across platform, follow material-design guidelines
- model data entities after schema.org and dublin-core, where it makes sense

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
