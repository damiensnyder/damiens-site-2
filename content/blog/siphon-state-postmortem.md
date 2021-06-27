[Siphon State](http://www.siphonstate.com) was a multiplayer webgame I made in the summer of 2020. The domain registration will run out in late July, and I think I will not renew it. This is its sending-off.

Briefly, it was a multiplayer deception game where you controlled a political party in a declining state. You could bribe politicians from other parties, and flip them to your side in critical moments. If you held the prime minister position and felt your advantage was large enough, you could "suspend the constitution", and if you won prime minister again you would win the game.

This was a pretty big project, but I didn't share it with very many people. The reason for that is that the game wasn't very fun.[^1] It was, one might say, a "learning experience," and in this post I will share said learning.

## Validate early

I would have saved a lot of development time if I had checked upfront whether the game was fun. In fact, I did playtest beforehand, but I started programming before actually finding an iteration that was enjoyable in a low-tech playtest.

Part of the reason I did not playtest enough in low tech is that I started during lockdown. There is only so much I am willing to test via spreadsheet—or, perhaps, I shouldn't have started until I found a ruleset so fun that I *would* enjoy it in a spreadsheet.

The golden rule of large projects remains: don't do the grunt work until you know it's worth doing.

## Don't do large projects

The other golden rule of large projects is not to do them. I say this tongue-in-cheek, but for my own projects I sincerely mean it. Siphon State, in fact, is the *only* solo project of its scale that I've actually completed. Other projects of such ambition fizzled after a week, or worse, fifteen weeks.

Even if you have the conviction to spend several months on a project (this one took four), for many types of projects you should not spend that long anyway. In my own experience, there is shockingly little correlation between time spent on a project and quality of result. The [staygo music video](/songs/staygo) took two weeks and sucked, whereas the [Air Bud video](/videos/2021-nba-draft-profile-air-bud) took three days and was good. [wwjd](/videos/wwjd) took two weeks and was much less funny than [bucko](/videos/bucko), which took four hours. [brightening the world](/songs/brightening-the-world) took a month, and [10 pm](/songs/10-pm) took a week and was better. All of these times would have been substantially shorter if I had dialed in the creation process more, and it is much quicker to dial in the process on small projects than large ones.[^2]

For different forms of art, different timescales are appropriate for trying ideas and improving quickly,[^3] but it is probably not worth spending more than a year on any project unless it is clearly very good. For fun, read through [the list of Rovio's games before *Angry Birds*](https://en.wikipedia.org/wiki/Rovio_Entertainment#2003%E2%80%932009). Of course, there are plenty of counterexamples, like *Stardew Valley*, [which took two years before publishing to Steam Greenlight and three more before full release](https://en.wikipedia.org/wiki/Stardew_Valley#Development). Ultimately, I think if I were to create either 2 or 20 projects in a year, not only would the 20 projects be better in aggregate, but the best 2 of those projects would be more successful than the 2 that took the whole year. So I have a rubber band on my wrist that I pull whenever I think about making games that would take two years and a collaborator to finish.

## The game mechanics

Several of the mechanics were conceptually interesting, and I would like to see them in a different context. The coolest, in my opinion, was the win condition. You won by winning an election, suspending the constitution, and then winning the next election. Suspending the constitution forced the rest of the players to team up on you while still jockeying amongst each other. There was a very nice tension at this stage of the game, because allowing opponents to team up kept the outcome always in question. (I wonder if this would have been even more exciting if the odds were slightly tilted in favor of the non-suspending players.) It was not always the right move to attempt to win as soon as you could, but it felt very risky to allow an opponent the opportunity to suspend the constitution. This mechanic also prevented anyone from being truly out of the game, because players with an advantage were incentivized to risk it all as soon as they could win. This either ended the game or helped the players in bad situations.

You could also bribe sleeper agents in other players' parties, whom you could "flip" at key moments to surprise your opponents. This was cool, but these betrayals required more luck than planning, so they didn't feel as rewarding as they could have. Sleeper agents are still conceptually cool, and I would like to make a better game that includes them one day.

The election process was very symmetrical, and I think this was a disadvantage. Many choices did not matter, or if they did, you still could only guess what was right, as in rock-paper-scissors. This was partly because every player's turn was simultaneous; this reduced waiting substantially, but it did not allow players to react as much to opponents' actions. Thus the elections were easy to learn and objectively balanced, but not very fun. However, adding asymmetry alone would not have fixed the game.

During the whole process, I was a stickler for keeping the rules as simple as possible. I may have gone slightly too far in this respect, but the greater flaw was that I too rarely pitted players directly against each other. Other deception games typically assign players to teams, or allow you to form them. The election[^4] and voting stages were designed to force players to compete with each other, but because the elections involved every player at once, they rarely encouraged you to negotiate with anyone individually. When I played, I felt as though I was interacting more with the game than with the people playing it.

There's no quick fix for the ruleset, and the best approach is probably to ditch almost all of it. Sometimes tweaks cannot take you where you want to go. (Or maybe I was twenty playtests away from an exciting and enjoyable game. Who knows?)

## The tech stack

*warning: if you don't program computers you will find nothing of value in this section*

The tech stack was well-suited for the game, and allowed a featureful and extensible codebase without excessive complication. The server-side code was all Express.js, and the front-end code was all Next.JS. Using `nextAppHandler`, these meshed great and I didn't have any problems. (After rapidly learning all of modern JavaScript in the first place, of course.) All the game logic was just some regular JavaScript classes held in memory. This may or may not have been scalable, but it didn't matter because it never had to scale. The other technologies involved included TypeScript and socket.io. These both worked, though they took some time to learn as well. Everything ran on one free Heroku node. Overall, this stack of technologies was great for a turn-based multiplayer game that didn't need to scale.

The component structure and CSS were generally a mess, because there were many game elements that all needed their own bespoke styling and logic. All the interactive elements needed to share a consistent game state, so callbacks had to be passed all over the place too. This was annoying enough that I eventually replaced it all with a single callback function, entitled `callback`, where the first parameter specified which callback function was actually desired. There might be a more idiomatic way, but it worked fine because the game state logic was centralized across the whole page.

The main difficulty in the frontend was showing the client the prospective results of their actions in the game. This meant maintaining game logic on both the server-side and client-side, but with slight differences to account for hidden information. This was too much to store in a React component's `state`, so I created a `GameState` class on the frontend tasked solely with maintaining an intermediate gamestate as the player chose actions.

There were very few tests, and I made them late in the process. They were all integration tests for the backend game logic. Writing more tests would have been silly, because I wasn't going to update the game much anyway, and *surely* no one else was.

I used Artbreeder to generate all the faces in the game. This was a very good decision, because trying to draw dozens of art assets would have been a waste of time. Real game studios can afford real art assets, but AI is becoming more and more promising by the day as an easy way to generate decent art assets quickly. And thank goodness for permissive licensing of AI-generated work!

Now that this game server is written, for future games I would much rather adapt it than write a whole new one again. So if I ever want to do that [Monopoly remix](https://twitter.com/damien__snyder/status/1396619600725364737), most of the work is done already :)

## In summary

I wouldn't say I regret working on Siphon State, and I'm proud that I finished it, but I would like to do better in the future. I did learn a lot, and it was pretty pleasant to work on. Some days I spent hours on end solving a mundane CSS or networking issue, but it's a very compelling sort of frustration. It's kind of sad that so few people played it, because it had very nice aesthetics. But alas, sometimes the only way to learn is to fail.

---

## Footnotes

[^1]: I kept it quiet both to avoid promoting a product I was unhappy with, and because if people asked to try it out I would be obliged to play. I think other people typically enjoyed the game in playtests more than I did.

[^2]: [Bill Wurtz](https://www.billwurtz.com/) writes about this sometimes. Even though his two most famous projects took three months and a year, they were preceded by hundreds of videos under seven seconds long.

[^3]: You could make a decent song in a week and learn a lot, but making a feature film in a week would be foolish and suck.

[^4]: The elections use a system kind of like quadratic voting, so really Siphon State is a driver of electoral reform.