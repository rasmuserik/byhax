# ByHax

ByHax is community software, **under development**. Initially targeting Tinkuy, but planning to support other communities and also festivals.

Focus for initial milestone (v0.1) is to match the current features of <http://tinkuy.dk>, which it intends to replace. Later versions will add more functionality (admin, etc.) and also target other communities.


Roadmap for milestone v0.1:

- [ ] Event calendar (responsive 7/4/1, autoscroll to today / current week)
    - [x] mirror event data from <http://tinkuy.dk/events.json> into mycrud database for faster lookup
    - [ ] week event calendar
    - [ ] individual events
    - [ ] responsive 7/4/1
    - [ ] auto scroll to current day if present
    - [ ] *semantic markup* of events
    - [ ] *month calendar*
- [ ] Top-menu, *material*. Probably through mustache template.
- [ ] *CMS-integration* (content pages from cms, mycrud running on CMS)
- [ ] Login (through newcirclemovement through cms)
- [ ] User List (retrieve info from newcirclemovement or cms?)
- [ ] Resource booking, and event support/signup (using tinkuy-economy)
- [ ] Event mangement (my events, suggest activity, /admin)

Urls:

- `/events/EVENT_ID`
- `/events` alias for `/event/week/THIS_YEAR.THIS_WEEK`
- `/events/week/YEAR.WEEK`
- `/users/all`
- `/users/teachers`
- `/users/practitioners`
- `/mycrud/...` access to underlying data

# Ideas/plans for future versions

- support other/different communities from same codebase
- integration with wordpress
- mycrud as separate product
- recurring events
- monthly event calender
- infinite scroll event calendar


## Sprints


# Design choices

- follow material-design guidelines
- model data entities after schema.org and dublin-core, where it makes sense
- data stored in mycrud key/value store
- keep number of dependencies low
- code formatting: prettier
