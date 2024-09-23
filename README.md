# Cookie Clicker

For the application's development, I utilised the 'useState', firstly for the 
game state object and also for the upgrades fetched from the web API.
I utilised 'useEffect' for handling the fetching and setup of the page and the 
game's tick loop, the latter requiring a cleanup to remove the running tick loop
timer.

I used the timer to update the game state object for each tick, which was first 
every second. However, I increased it to 10 ticks per second as this provides a 
better effect and experience to end users regarding the visual appearance of the
counter.

I utilised the Array map method to take the upgrade object array and translate 
it into UpgradeItem Components, which provided the shop with an item list that 
included buttons for purchasing upgrades.

I utilised the useState hook ability to take a function to initialise the 
default variable to load the game from local storage.

I wrote my own express API using TypeScript to provide a location to fetch the 
game's upgrades. While I initially utilised only the values from the source 
array, I started to add my custom upgrade types to the game, which I handled in 
the game's logic to boost a player's click rate. In the future, I'd migrate this
to using string IDs for the upgrades to support inserting new upgrades without 
having to write migration logic.

I believe that I achieved the visual layout I wanted. Though I did change from 
using a list to cards for the design, this was in part because I wanted to 
experiment a little more with the UX. I was hoping to spend Sunday 
watching/reading up on some CSS material to produce a more outstanding look; 
however, due to health issues, I did not manage to find the time for this.

The only real bugs that I hit were related to state handling. Utilising an
object for tracking state was a good idea just because it helps simplify some 
aspects of how passing this information through the app works. However, this did
introduce some fun moments due to React expecting that state update functions 
are pure, which produced some side-effects relating to updating this object.

I found this project to be kind of fun, and it helped light up a bit of the 
spark that got me into programming in the first place. I will admit to having 
rushed towards writing the express app first; utilising TypeScript came as a 
"hey, wouldn't it be fun to toy with this?" as this felt like the perfect 
low-risk excuse to try it, which, I think, helps with resolving some of the 
issues I had with JavaScript in terms of IDE support, which I often mitigated 
by being pretty heavy with JSDocs.
