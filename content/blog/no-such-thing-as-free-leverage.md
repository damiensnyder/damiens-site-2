It has come to my attention that many people play sports and games. Valued qualities of these activities include "exciting," but I am here to inform you that excitement is in limited supply.

What I mean by excitement is fluctuation in the expected outcome. "Excitement," by this definition, is the same as the term "leverage" used in sports. To illustrate it clearly, here are some examples of high, low, and normal leverage.

Most games begin in situations with roughly **normal leverage**. The first inning of a baseball game, the first word in Scrabble, and the opening stretch of a race all fit in this range. Performing poorly here hurts your chances of winning, but there is plenty of time to recover.

A **high leverage** situation might be the end of a close basketball game, or the last stretch of a tight race. These are the game-defining moments, when the stakes are highest. Often these come at the end of the game, but not always. For example, in Settlers of Catan, players spend the first two turns placing their starting settlements. Because these settlements are constant throughout the game, they are more influential than most decisions made later, so this would also be high-leverage.

![A high excitement game](/blog/sea-vs-sf.png)

**Low leverage** situations are common too,  termed "garbage time" by some sports fans. These usually occur when one participant has a large lead over the other(s). A football team down by 30 points is hopeless no matter what they do; in some competitions the outcome can be decided before the game is technically "over." They can also happen in the middle of a match, when an intermediate outcome is too likely, too unlikely, or too unimportant to the overall outcome.

In general, the most important moments of a competition are the most enjoyable. They engage fans and form the basis of the stories that come from a game. Likewise, the least important moments of a game suck. In a blowout win or loss in sports, fans will leave their seats early because the remaining game is irrelevant. It is not fun go through the motions until you are allowed to stop. Because of this, game designers and sports leagues invent mechanisms to get rid of these low-leverage moments. Most of them fall into one of three categories:

## 1. Backloading

Consider the structure of Jeopardy. In the later rounds, questions are worth more points than the first round. This means that it is hard to be truly locked out of the competition until very late. Conversely, early leaders cannot rest on their laurels, because more valuable questions are coming. This has the benefit that the end is more exciting, and fewer points are truly irrelevant, but it comes with a consequence: the first round is *less important*. The later rounds gain importance only at the expense of the first.

![Double Jeopardy round, hoarding all the leverage](/blog/double-jeopardy.jpg)

Alternatively, consider the structure of most American sports leagues. A team with a mediocre record in the middle of the season can still make the playoffs, so they remain in championship contention until relatively later. Note that the rules about leverage apply to leagues as well as matches within a league.

## 2. Ending early

When you play rock-paper-scissors in a best of 3, do you keep going after someone wins the first two? Of course not, because the outcome is already known. Tennis, volleyball, and some board or video games do the same. With this approach, low-leverage situations can be entirely eliminated. Why doesn't this violate the principle that there is a finite amount of expected leverage? Low-leverage situations are removed, but additional leverage is not created, except by doing more competitions. A 3-0 sweep in volleyball has no garbage time, but it does not have more excitement than a blowout in another sport.

Ending early has other disadvantages. Variable match length can leave spectators feeling that they didn't get their money's worth, or tight competitions can take hours without a finish. Some tournaments *intentionally* don't end early, giving lesser teams an opportunity to play more matches.

## 3. Multiple goals

What do you do if you can't win first prize? Win second! Having multiple goals means running multiple competitions at the same time, based on the same events. As an example, European soccer leagues relegate their worst teams to a lower division, lending importance to matches between teams with no shot at a title.

Most competitions have an unwritten secondary goal, which is *to play as well as possible*, even disregarding the outcome. Losing basketball teams don't sit down on the court, because it's more entertaining for fans and players if the match goes on anyway.

![Still putting on a show in garbage time](/blog/garbage-time.jpg)

# What does it mean that there's no free leverage?

The intuition behind this is that leverage is *the ability for events to influence the outcome*. However, with more events in a match, each event must have less influence. In rock-paper-scissors, for example, a best of 999 has more events than a best of 3, but each individual round has far less influence.

Mathematically, we assign a probability of winning to each state during a game. If two opponents are evenly matched, the probability of winning at the start of the match might be 50% for each side. After one side scores some points (or whatever), their odds of winning might be 60% and their opponent's would be 40%. If their opponents are now close to evening the score, it might be 55-45, and so on.

The "excitement" that occurs is measured as the total change in win probability from events in a match. If a competitor's odds of winning go from 90% to 10% and back again, that's exciting! If it steadily climbs toward 100% without much change, that's not exciting. However, if an event changes a competitor's odds of winning from 65% to 75%, we *don't* record the excitement as 10%. We record it as the square of the change in excitement, or 1%. If excitement is measured as the verbatim change in probability, then by making events infinitely granular the excitement approaches infinity as well too.[^1] But this isn't right. A best of 999,999 rock-paper-scissors contest is *not* more exciting than a best of 3 simply because it takes longer. Thus we square it.[^2] The leverage is the *expected* excitement of a given event, and the expected future leverage is the expected sum of the leverage of all future events.

The expected future leverage (or, as I may abbreviate it, EFL) can be reduced to a pleasantly simple formula:
$$
\textrm{EFL} = p(1 - p)
$$
where $p$ is the current expected odds of winning. In less formal terms, the expected future leverage is the odds you win times the odds you don't win. This means that the highest EFL occurs when a match is exactly 50/50, and the lowest is when one outcome or another is certain. Even somewhat lopsided stages of a match have reasonable EFL, though—a perfectly even match has only twice as much EFL as one that is 85/15.

# Why do all outcomes conform to this equation?

I will spare calculus-challenged readers the ground-level math behind this,[^3] but the foundation behind this is the similar principle of *conservation of expected evidence*. This principle states that, if you expect something, you must expect to expect it exactly as much (on average) after an observation. To give a more concrete example, imagine a character named Bob who is checking the weather.

Bob thinks there is a 70% chance of rain tomorrow, but he'd like to check the weather to get a second opinion. He doesn't trust the weather service completely, but if they say it will rain tomorrow, he will revise his estimate up to 90%. If they say it won't rain, he'll revise his estimate down to 20%. Before checking, Bob thinks there is a 60% chance the weather service says it rains tomorrow.

![Here we ignore that weather forecasts use probabilities and not binary statements](/blog/probability-of-rain.png)

This doesn't line up! Bob thinks there is a 70% chance of rain, but he expects (on average) to think there is a 62% chance of rain after checking the weather report, *even though he hasn't checked yet*. The number 62% comes from the $90\% \cdot 60\% = 54\%$ chance Bob assigns to the weather report saying it will rain and being right, plus a $40\% \cdot 20\% = 8\%$ chance Bob assigns to the weather report saying it won't rain and being wrong.

It is illogical to expect something but expect to expect something else in the future, and conservation of expected evidence points out that mistake in Bob's numbers. (If you do find a Bob in the wild, see if they are willing to make bets with you.)

How this applies to leverage is that, though a comeback is exciting, *you cannot expect a comeback*. If a comeback is too likely, it ceases to be a comeback. If a game is constructed so that it is common to come back from a bad situation, the situation is not as bad as it seems. Games can trick a player into thinking a situation is more extreme than it is (this is usually related to the concept of "being fun to play"), but they can never violate the mathematical law.

# What does this mean for game design?

Game designers have a difficult task, because their goal is to put players in the most exciting situations possible consistently. This is especially hard, for example, in multiplayer board games, where every player's chance of winning must be kept in a reasonable game for most of the duration of the match. Some games succeed more than others, and here are some approaches to keep it fun:

## 1. Match players of equal skill levels

This is hard to do in non-digital games, because the player pool is "everyone in the room right now," and not "everyone online right now." Digital games usually take full advantage of this, using matchmaking systems to make sure every game is as close to 50/50 at the start. Games where players pre-select classes or decks must take extra care: even if the odds of winning a random match are 50/50, if the opponent's deck or build counters yours, a given match could be much less exciting. Put another way, as much of the outcome as possible should be decided *after the match starts*.

![MMR depicted here in Dota, but I have not been able to implement it for Battleship, sadly](/blog/mmr.png)

There are a couple ways analog games can approximate this, but none are quite as satisfying. A simple one is to shrink the gap between the best and worst players, so there is more to fight for even with unequal skill. This is especially unsatisfying because the skill gap must be replaced by randomness, so player-influenced leverage does not really increase. A similar approach is to make the game easier, but with less possibility for mastery there is little incentive to improve.

Some games have handicaps to make things more tight, which is not nearly as good as an even match, but if it makes sense it can still be quite successful. Go and golf both use handicap systems extensively, though they have caught on much less in other games. In some cases, players will do the work of a handicap system themselves, for example by using their non-dominant hand, or by making unequally-sized teams.

## 2. Use hidden information

Hidden information provides an illusion to players that they can meaningfully influence the outcome, even if it would not appear that way to an all-knowing observer. Poker players have leverage (from their own perspective) in a hand where they're screwed, because *they* don't know that they're screwed.

Hidden information is a way of backloading change of expectations without backloading the leverage itself. In many ways, it is simply luck, but if done well it feels very different. If a game has points that are not revealed until the end (poker or Settlers of Catan, for example), the exact threshold required to win a match can be hidden, keeping expectation within a narrower range. Note that expectation still cannot change any more on average than mathematically allowed, although psychologically it might in a well-designed game.

## 3. Any of the common approaches listed earlier

These are backloading leverage, ending early, and using multiple goals. Each of these have tradeoffs, but they are all tried-and-true and present throughout all sorts of competitions. Multiplayer board games, for example, benefit a lot from backloading leverage in a compelling way. No one likes to be stuck in a game where they no longer have a chance, a common failure of frontloaded games like Settlers of Catan. It is more important when backloading leverage to keep losing players in it than to slow down winning players: the dropoff in EFL is much less from 50% to 30% than from 10% to 0%.

![A Settlers of Catan board, with most of the outcome decided already](/blog/settlers-of-catan.jpg)

Likewise, many games benefit from ending early (especially good when it means you get to play more games quicker). Some other games include multiple goals, like wins and draws in chess and soccer. Usually second place is not compelling enough on its own. Rewards that carry over from game to game, like goal differential in soccer or XP in video games, are better examples of compelling secondary goals.

## 4. Make the game fun regardless of the outcome

Surprise! This is obvious advice, but it cannot be ignored. At the risk of saying "just make it good lol," it doesn't matter how likely you are to win a match if it's not fun anyway. Some of our most popular sports and games evolved largely by accident, and they are captivating despite the presence of "garbage time." Many games with smart design around leverage still suck. Take the above advice into consideration, but remember that leverage is only one component of enjoyment.

---

# Footnotes

[^1]: This is similar to the [Koch snowflake](https://en.wikipedia.org/wiki/Koch_snowflake), a fractal with infinite perimeter but finite area.

[^2]: If a game has $n$ states where the probability of winning at state $i$ is $p_i$, then we would describe the total excitement as
    $$
    E = \sum_{i = 1}^n (p_{i - 1} - p_{i})^2
    $$

[^3]: For those of you interested in the math behind this, here is the explanation. For a given game state, let $f_p(x)$ be the probability of having probability $x$ to win (or achieve some other outcome) after the next event occurs, when the current state has probability $p$ to win. Multiple functions of this type can exist in the same game for the same value of $p$, but they will all follow this rule. Because of the conservation of expected evidence, the values of $f$ must satisfy $\int_0^1 x f_p(x) \textrm{d}x = p$. As well, because the total probability mass of the expectation after the event must be exactly 1, the equation $\int_0^1 f_p(x) \textrm{d}x = 1$ must hold. The expected future leverage is the leverage of the next event plus the expected future leverage of the probability after it. This is captured by the equation
    $$
    E(p) = \int_0^1 f_p(x) [(x - p)^2 + E(x)] \textrm{d}x
    $$
    where $E(p)$ is the expected future leverage. Expanding the product inside the integral gives
    $$
    E(p) = \int_0^1 x^2 f_p(x) - 2px f_p(x) + p^2 f_p(x) + E(x) f_p(x) \textrm{d}x
    $$
    We can substitute the values of some of the integrals from earlier, removing the $- 2px f_p(x) + p^2 f_p(x)$ and simplifying to get
    $$
    E(p) + p^2 = \int_0^1 f_p(x) [E(x) + x^2] \textrm{d}x
    $$
    From the conservation of expected evidence we know that $\int_0^1 x f_p(x) \textrm{d}x = p$. For $E(p) + p^2$ to equal $p$, $E(p)$ must be $p(1 - p)$. The only other formula for $E(p)$ that would technically satisfy this integral is $-p^2$, but this produces negative values for EFL. (Frankly, I don't have a satisfactory proof for the lack of other solutions, but I am nevertheless very confident in it.)