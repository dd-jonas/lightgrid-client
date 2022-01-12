# 23:41 - Light Grid

This project contains both the client to communicate with the server and a REST API to change the animation paths.

## Installation

1. `npm i`
2. Copy `.env.example` to `.env` and fill in the variables
3. Place lights in the room at the positions described in `src/config/index.js`. You can verify the correct ids by querying each light one by one using the `.rest` file along with the REST Client plugin for VS Code. Make sure to update the @baseUrl as needed first.
4. `npm run start`

## States

|   ID | Name                 | Description                         | Lights            | Transition[^1] |
| ---: | :------------------- | :---------------------------------- | :---------------- | :------------- |
|    0 | Inactive             | Default state                       | All lights off    |                |
|    1 | Active               | Default state                       | All lights on     |                |
|   10 | Start                | When players enter                  | Ceiling light on  |                |
|   11 | John seance (failed) | John's failed seance                | Animation         | 12             |
|   12 | Jane search          | Start of phase 1                    | All lights on     |                |
|   13 | Jane seance          | Jane walks around the room          | Animated path     | 14             |
|   14 | Jane waiting         | Jane waiting by the television      | Left TV light on  |                |
|   15 | Mary search          | Start phase 2                       | All lights on     |                |
|   16 | Mary seance          | Mary walks around the room          | Animated path     | 17             |
|   17 | Mary waiting         | Mary waiting by the television      | Right TV light on |                |
|   18 | John search[^2]      | Start phase 3                       | All lights on     |                |
|   19 | John seance          | John walks around the room          | Animated path     | 20             |
|   20 | John waiting         | John waiting by the television      | Both TV lights on |                |
|   21 | End reunion          | John, Jane and Mary appear together | Animation         | 2341           |
| 2341 | WIN                  | Players have rescued John's soul    | All lights on     |                |

**Test States**

|  ID | Light         |
| --: | :------------ |
| 201 | Mary's Chest  |
| 202 | Desk          |
| 203 | Wall South    |
| 204 | Wall East     |
| 205 | Bookcase      |
| 206 | Standing Lamp |
| 207 | Makeup Table  |
| 208 | TV Left       |
| 209 | TV Right      |
| 210 | Ceiling       |

[^1]: At the end of every animation, the state will automatically transition and this new state id will be sent to the server.
[^2]: Not really a search since all of John's attributes are found at this point. Players should simply place the attributes on the table and take a seat to start the next seance.

## Authors

Kobe Coene, Kobe Devillé, Niels Moens, Jonas Di Dier
