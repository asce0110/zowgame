// Original reading guide to MinaLima's published rulebook, checked 12 October 2026.
// Page references use the printed page numbers, not the PDF viewer's spread count.
// Strategy notes are deductions from those rules, not results of playtesting.

export type DefendersGuideSection = {
  id: string;
  title: string;
  eyebrow: string;
  intro: string;
  sourcePages: string;
  rules: Array<{ title: string; body: string }>;
};

export const defendersGuideSections: DefendersGuideSection[] = [
  {
    id: "setup",
    title: "Set up a first game",
    eyebrow: "01 / Before the first turn",
    intro:
      "One player controls the Dark Arts. The other one to four players each take a different Hogwarts house. Set up the two sides separately: their pawns, card supplies and objectives work differently.",
    sourcePages: "pp. 6–10, 12–13",
    rules: [
      {
        title: "Adjust the Dark Arts pool to the player count",
        body:
          "With one, two, three or four House Players, give the Dark Arts Player four, five, six or seven pawns respectively. Put four on the four mask-marked Deployment Spaces; keep any extra pawns off the Main Board in that player's pool. Each house starts with three pawns in the Great Hall and its fourth pawn on the first Loyalty Track space.",
      },
      {
        title: "Prepare the castle",
        body:
          "Shuffle the six Defence Shields and place one face-up on each Defence Shield Space. Put all seven Hogwarts Tokens on their marked starting spaces. Keep the Room of Requirement piece and D.A. Coins beside the board; the room is revealed later, rather than being available at the start.",
      },
      {
        title: "Lay out the shared card supplies",
        body:
          "Put the Side Board above the castle. Shuffle the Library Book Deck and reveal two books. Shuffle the House Player Acquire Deck and reveal two cards in the Advanced Acquire Row and two in the ordinary Acquire Row. Shuffle the House and Dark Arts Location Decks separately and leave them face-down in their own spaces.",
      },
      {
        title: "Set the two tracks and item supply",
        body:
          "Start the Dark Arts Marker at the top-left first space of its path. Put the three Dark Arts Progress Tokens on their matching path positions. Place the Dark Detector on its marked Loyalty Track space and the Parchment Scrolls in their supply space. House pawns on the Loyalty Track track progress; they are not extra castle pawns.",
      },
      {
        title: "Give each house its own starting deck",
        body:
          "Each House Player takes the matching board and seven-card Starter Deck, shuffles that deck into their Draw Deck and puts their House Marker in the Items area. Deal three House Player Location Cards to each house. Draw five starting cards from the Starter Deck. Return the components of unchosen houses to the box.",
      },
      {
        title: "Prepare the Dark Arts cards",
        body:
          "Give the Dark Arts Player their board, shuffled seven-card Starter Deck and separate shuffled Acquire Deck. Divide the Event Cards into white, orange and red decks, shuffle each colour separately and keep them separate. The Dark Arts Player also draws five starting cards. The rulebook recommends an experienced player for this role while the group is learning.",
      },
      {
        title: "Start with the house on the Dark Arts Player's left",
        body:
          "That House Player takes the first turn, then play continues clockwise in seating order. Keep each player's Draw Deck and Discard Pile distinct throughout play.",
      },
    ],
  },
  {
    id: "house-turn",
    title: "Take a House Player turn",
    eyebrow: "02 / Explore, Learn or Replenish",
    intro:
      "Choose one Main Action. Add any eligible Free Actions around it, resolve the spaces you land on and discard the cards you played when the turn ends. Learning and replenishing are alternatives to exploring, not extra steps in every turn.",
    sourcePages: "pp. 12–13, 16–17",
    rules: [
      {
        title: "Explore with one card",
        body:
          "Play a card from your hand and resolve its movement and/or effect. You choose whether movement or the effect comes first. If that card permits a second card, finish resolving the first before starting the second. Effects are optional unless the card makes them mandatory; a card's explicit exception takes priority over the general rule.",
      },
      {
        title: "Read the effect's timing",
        body:
          "An instant effect resolves at its stated moment, a conditional effect needs its condition, and a turn-long effect remains available for that turn. A lightning-marked reactive card can instead be used from your hand outside your turn when its trigger occurs: resolve only its effect and immediately discard it. Playing that reactive card normally uses its movement and ignores the reactive effect.",
      },
      {
        title: "Treat House contact as a stun",
        body:
          "When your House pawn ends its move with a Dark Arts pawn, lay both pawns sideways. You choose an adjacent space for the Dark Arts pawn. This is different from a Dark Arts bump: your House pawn is not sent to the Great Hall by this contact. A stunned pawn cannot move through either a movement value or a card effect.",
      },
      {
        title: "Learn only while a pawn is outside protection",
        body:
          "You need at least one of your House pawns outside a Protected Area to choose Learn. Discard one hand card for one card from the ordinary Acquire Row or the top of the face-down Acquire Deck. Alternatively, discard two hand cards for one face-up Advanced Acquire card and advance your Loyalty pawn one space.",
      },
      {
        title: "Put an acquired card on top of your Draw Deck",
        body:
          "An acquired card goes face-down on top of your own Draw Deck, rather than straight into your hand. Refill a shared Acquire Row by shifting its remaining cards to the right and dealing new cards into the empty leftmost spaces. Keep the ordinary and Advanced Rows distinct.",
      },
      {
        title: "Replenish in this order",
        body:
          "First, discard any number of hand cards you choose and draw until you have five cards. Next, stand up all your stunned pawns. Finally, advance the Dark Arts Marker one space and resolve an Event if it lands on an Event Space. When your Draw Deck runs out, shuffle your Discard Pile to make the new Draw Deck.",
      },
      {
        title: "Add eligible Free Actions, then finish the turn",
        body:
          "Before or after your Main Action, you may return a Hogwarts Token gained on an earlier turn and play a matching card as an extra Explore action. You may also claim a Parchment Scroll when two of your Location Cards are satisfied at once; see the item checklist below. These Free Actions do not replace your one Main Action. Finish by discarding the cards played this turn and passing play to your left.",
      },
    ],
  },
  {
    id: "dark-turn",
    title: "Take the Dark Arts turn",
    eyebrow: "03 / Deploy, bump and build pressure",
    intro:
      "The Dark Arts Player chooses Explore or Replenish. This side has no Learn action: bumps provide acquired cards, and the path unlocks stronger effects as the game progresses.",
    sourcePages: "pp. 20–21",
    rules: [
      {
        title: "Explore and resolve cards in order",
        body:
          "Play a hand card and choose whether to resolve movement or its available effect first. If it grants another card play, finish the first card before resolving the next. Use only unstunned pawns for movement. Put played cards in your Discard Pile at the end of the turn, then pass play to your left.",
      },
      {
        title: "Pay a movement point to deploy",
        body:
          "Bringing a pawn from your off-board pool onto a mask-marked Deployment Space costs one movement point. You can use remaining movement to continue from there. You cannot deploy onto a Deployment Space already occupied by a Dark Arts pawn, including a stunned one.",
      },
      {
        title: "Resolve a bump when you end on a House pawn",
        body:
          "Choose one House pawn if several share the destination. Return that chosen pawn to the Great Hall and return the Dark Arts pawn that bumped it to your off-board pool. Take that house's House Marker if you do not already hold it. Passing through a House pawn's space is not the same as ending your move there.",
      },
      {
        title: "Complete a set of House Markers",
        body:
          "When you hold the markers of all houses participating in this game, advance the Dark Arts Marker one space and return those markers to their owners. A second bump against a house whose marker you already hold does not give you another copy. Check whether the resulting path movement triggers an Event.",
      },
      {
        title: "Take the bump's card reward once per turn",
        body:
          "After a bump, draw the top two cards of your Dark Arts Acquire Deck. Choose one to put face-down on top of your Draw Deck and return the other to the bottom of the Acquire Deck. Resolve this acquisition only once that turn, even if further card plays cause more bumps.",
      },
      {
        title: "Unlock card effects by path colour",
        body:
          "White effects are available from the start. Orange effects unlock when the marker reaches the first orange space; red effects unlock at the first red space. Earlier colours stay available. Before an effect's colour unlocks, the card can still supply movement, but that effect cannot be resolved. Entering the colour zone, rather than reaching its first Event, is the unlock trigger.",
      },
      {
        title: "Replenish without discarding your hand",
        body:
          "Stand all your stunned pawns first, then draw until you have five hand cards. You cannot discard unwanted cards as part of this action. Unlike a House Replenish, a Dark Arts Replenish does not itself advance the Dark Arts Marker.",
      },
    ],
  },
  {
    id: "movement",
    title: "Read the map and movement values",
    eyebrow: "04 / Routes, obstacles and landing spaces",
    intro:
      "Count spaces, then check the route's permissions. A high movement value does not automatically open a wall, an obstacle, a Secret Passage or a Protected Area.",
    sourcePages: "pp. 10–11, 16, 20",
    rules: [
      {
        title: "Keep movement values together",
        body:
          "A single value of four moves one unstunned pawn up to four spaces; it is not a pool for several pawns. A card showing three plus three can move two different pawns up to three spaces each, or one pawn up to six. You cannot turn that two-pawn allocation into two plus four. You choose which of the two printed values to use first.",
      },
      {
        title: "Follow full borders, not corners",
        body:
          "Normal movement goes between spaces that share a full border. Space dividers can be crossed, including the red entrance and exit dividers; castle walls cannot. House pawns may move through or share spaces with other House pawns, but cannot backtrack during the same turn.",
      },
      {
        title: "Match a House card to the obstacle",
        body:
          "Locked Doors, Protective Spells, Physical Objects and Water block House movement unless a card effect permits that obstacle. Read the permission before planning the route. Dark Arts pawns can cross those four obstacle types freely; that permission does not turn castle walls into traversable spaces.",
      },
      {
        title: "Keep Dark Arts pawns out of Protected Areas",
        body:
          "The four blue-shield Protected Areas forbid Dark Arts pawns both from passing through and from ending there. They are different from the six spaces holding collectible Defence Shields. A House pawn inside a Protected Area therefore cannot be bumped there.",
      },
      {
        title: "Use special routes only with permission",
        body:
          "A card effect can allow a pawn to fly between Fly Off Points; that flight costs no movement points. House pawns can use a Secret Passage only when a card permits it, and moving between its matching entrances costs one movement point. Dark Arts pawns cannot use Secret Passages.",
      },
      {
        title: "Finish on a Bonus Space to use it",
        body:
          "A House pawn must end its move on a Bonus Space; merely passing through does not trigger it. Card Draw gives one card from your Draw Deck. Play Again gives another turn. A Card Acquire bonus lets you take an ordinary face-up card or the top face-down Acquire card, or discard one hand card for an Advanced card and one Loyalty step.",
      },
      {
        title: "Separate movement from a destination's requirement",
        body:
          "Reaching a space does not waive its item or card conditions. A Secret Passage needs permission, a Defence Shield needs its three pictured items, and a Hogwarts Token cannot grant its extra Explore until a later turn. A stunned pawn cannot use movement or a movement effect to leave its space.",
      },
    ],
  },
  {
    id: "resources",
    title: "Collect the items a shield requires",
    eyebrow: "05 / Books, Scrolls and Loyalty",
    intro:
      "Each shield asks for a Library Book, a Parchment Scroll and one particular third item. Read the pictured requirement before choosing a route. The Dark Detector and a D.A. Coin are different ways to meet different shields' requirements.",
    sourcePages: "pp. 11–12, 17–19",
    rules: [
      {
        title: "Pick up one Hogwarts Token for a later turn",
        body:
          "End a House pawn's move on a space with an available token to take it. You can hold only one; return your existing token to its original space before taking another. From your next turn, return it to that space and play a card of its matching type for an extra Explore action, before or after your Main Action.",
      },
      {
        title: "Visit the Library with an empty book slot",
        body:
          "You can hold only one Library Book. If you visit the Library without one, choose either of its two face-up books. Resolve that book's effect and any resulting effects immediately, then place it on your board. Refill its face-up Library space from the Library Book Deck. Saving the book's effect for a later turn is not an option.",
      },
      {
        title: "Occupy two current Location areas together",
        body:
          "To gain a Scroll, have your House pawns in two of the three areas named by your current House Player Location Cards at the same time. Reveal those two satisfied cards and return them to the bottom of the Location Deck. For your first Scroll, draw two replacement Location Cards. For your second, also return your remaining Location Card; you receive no more Location Cards for the rest of the game.",
      },
      {
        title: "Trade the three pictured items for a shield",
        body:
          "On a Defence Shield Space, give up one Library Book, one Parchment Scroll and the third item pictured on that shield: either the Dark Detector or a D.A. Coin. Take the shield from the Main Board. Having a coin does not satisfy a Detector shield, or vice versa. One House Player wins as soon as they have any two shields.",
      },
      {
        title: "Advance Loyalty and check who holds the Detector",
        body:
          "Advance Loyalty by ending a House pawn's move on a Dark Detector icon, using a relevant card effect, or buying an Advanced card through Learn. At the fifth space or beyond, take the Detector if your Loyalty pawn is farther ahead than everyone else's. A tie does not displace its holder. At the final track space, a newcomer takes it from an existing holder there; that previous holder moves back one space and draws a card.",
      },
      {
        title: "Account for spending the Detector",
        body:
          "When you use the Dark Detector to obtain a shield, move your Loyalty pawn back three spaces. Return the Detector to its Side Board space unless another house is already at the fifth space or higher, in which case it passes to an eligible house. If eligible houses are tied, the first to reach the fifth space or beyond receives it. Recheck the Room of Requirement after the track changes.",
      },
      {
        title: "Watch the Room of Requirement open and close",
        body:
          "The first house to reach the fifth Loyalty space or beyond reveals the room for all House Players. Entering it gives a D.A. Coin from the supply; each house can hold only one coin. When every Loyalty pawn is below the fifth space, remove the room piece. A pawn inside remains there and cannot leave until the room is revealed again.",
      },
    ],
  },
  {
    id: "ending",
    title: "Resolve Events and check the real win conditions",
    eyebrow: "06 / White, orange, red and the last hand",
    intro:
      "The path is a pressure clock and a source of Events, not an automatic Dark Arts victory. House Players race for shields while the Dark Arts Player collects Progress Tokens and positions pawns at a revealed target.",
    sourcePages: "pp. 22–23",
    rules: [
      {
        title: "Advance the path only for its stated triggers",
        body:
          "Advance one space when a House Player Replenishes, an Event instructs it, or the Dark Arts Player completes a set of all participating House Markers. Landing on a non-Event space has no Event to resolve. Drawing cards from a Bonus Space, Library Book or Event is not itself a House Replenish and does not pay its path cost.",
      },
      {
        title: "Resolve the House half of an Event first",
        body:
          "On an Event Space, draw the top Event Card matching that space's colour. All House Players resolve their part if possible. The Dark Arts Player then chooses their Event effect or that zone's Progress Token if it is still available. Discard the resolved Event Card near its deck. Once the marker enters a new colour zone, earlier zones' Event decks are no longer used.",
      },
      {
        title: "Collect each zone's Progress Token before leaving it",
        body:
          "The white, orange and red zones supply the Giant, Acromantula and Dementor Progress Tokens. The Dark Arts Player must take a zone's token before advancing into the next zone. Choosing a token instead of the Dark Arts Event effect does not cancel the House Players' part of the Event.",
      },
      {
        title: "Count shields per House Player",
        body:
          "A House Player wins when that player has collected two Defence Shields. The houses do not add their shields together for a shared two-shield victory. For example, two houses holding one shield each have not yet met a House Player win condition.",
      },
      {
        title: "Combine all three tokens with the target location",
        body:
          "The Dark Arts Player needs all three Progress Tokens and the required number of Dark Arts pawns at their Location Card's area simultaneously. Taking the red token and Location Card at the first red Event requires three pawns; waiting until the next red Event requires two. At the final path space, take a Location Card if you have not already done so; the final-space target requires one pawn. The rulebook ties the required count to where the Location Card was taken, so check that timing rather than counting the current path colour alone.",
      },
      {
        title: "Switch to the final hand at the path's end",
        body:
          "When the marker reaches the last path space, every player draws up to five hand cards and nobody may Replenish again. Reaching this space does not immediately award a win or end the game. Card effects and card-draw spaces can still supply cards; the restriction is on Replenish.",
      },
      {
        title: "Continue until a victory or exhausted hands",
        body:
          "During the final-hand phase, continue normal play until a house gains its second shield or the Dark Arts Player completes the token-and-location objective. If all players run out of cards before either side achieves its objective, the game is a draw.",
      },
    ],
  },
];

export const defendersRuleFaqs: Array<{ q: string; a: string }> = [
  {
    q: "Is Defenders of Hogwarts fully cooperative?",
    a: "One player is the Dark Arts opponent. The House Players defend Hogwarts, but each house has its own winning requirement: that player must collect two Defence Shields. One shield in Gryffindor's possession and one in Ravenclaw's do not combine into a House victory.",
  },
  {
    q: "Can I Explore, Learn and Replenish in the same turn?",
    a: "Choose one Main Action. A House Player chooses Explore, Learn or Replenish; the Dark Arts Player chooses Explore or Replenish. Eligible House Free Actions and an explicit card or Bonus Space permission can add actions, but the standard turn does not include all three.",
  },
  {
    q: "Can I split a three-plus-three card into two moves and four moves?",
    a: "No. Move two different pawns up to three spaces each, or one pawn up to six. A single four-value card likewise moves one pawn up to four spaces; it cannot be divided among several pawns.",
  },
  {
    q: "Is my House pawn bumped when I move it onto a Dark Arts pawn?",
    a: "No. House-initiated contact stuns both pawns, and the House Player moves the Dark Arts pawn to an adjacent space. A Dark Arts pawn ending its move on a House pawn instead causes a bump: the chosen House pawn returns to the Great Hall and the Dark Arts pawn returns to its off-board pool.",
  },
  {
    q: "Can I Learn while all three of my castle pawns are in Protected Areas?",
    a: "No. Learn requires at least one of your House pawns outside a Protected Area. Having cards available to discard does not remove that requirement. The fourth pawn on the Loyalty Track is not a castle pawn for this check.",
  },
  {
    q: "Can I play a card immediately after acquiring it?",
    a: "Acquired cards go face-down on top of your Draw Deck, not directly into your hand. You need a later draw to get that card into your hand, and permission for another card play if you want to use it during the same turn.",
  },
  {
    q: "Can the Dark Arts Player discard unwanted hand cards when Replenishing?",
    a: "No. Dark Arts Replenish stands stunned pawns and draws to five without discarding hand cards or advancing the path. House Replenish permits discarding hand cards, then draws to five, stands stunned pawns and advances the path one space.",
  },
  {
    q: "Does every card draw move the Dark Arts Marker?",
    a: "No. A House Replenish advances it, but draws caused by a Library Book, Event or Bonus Space do not. Five cards is the Replenish target, not a universal hand-size cap; other draw effects can add cards without charging the Replenish path cost.",
  },
  {
    q: "Can I use a Hogwarts Token on the turn I pick it up?",
    a: "No. Its extra Explore is available from your next turn. Return it to its original space and play a hand card matching the token's type. You can hold only one token, so return your old one before taking another.",
  },
  {
    q: "Does an Advanced Acquire card always cost two discarded cards?",
    a: "No. The Learn Main Action costs two hand cards for an Advanced card and one Loyalty step. The Card Acquire Bonus Space offers that Advanced card and Loyalty step for one discarded hand card. The bonus only triggers when your House pawn ends its move on the space.",
  },
  {
    q: "Can I visit two Location areas on different turns to earn a Scroll?",
    a: "Your pawns must occupy two of your three current Location areas simultaneously; visiting one and leaving before reaching the other does not satisfy the condition. After the first Scroll, replace the two used Location Cards. After the second, return the remaining card too and receive no more Location Cards that game.",
  },
  {
    q: "Can a Dark Arts pawn cross a Protected Area without stopping?",
    a: "No. A Dark Arts pawn may neither pass through nor end on any of the four blue-shield Protected Areas. Crossing ordinary obstacles freely does not override this restriction. Protected Areas and collectible Defence Shield Spaces are different map features.",
  },
  {
    q: "Can I deploy onto a mask space occupied by my stunned Dark Arts pawn?",
    a: "No. A Dark Arts pawn already there blocks deployment even when stunned. Choose a Deployment Space without a Dark Arts pawn and spend one movement point to bring the new pawn onto the board.",
  },
  {
    q: "Do several bumps in one turn give several Acquire rewards?",
    a: "No. The top-two Dark Arts Acquire choice is resolved once per turn, even if you bump again. Each bump still resolves its pawn returns and House Marker check. If multiple House pawns share the destination, choose one to bump rather than returning them all.",
  },
  {
    q: "Must I reach an orange Event before orange card effects work?",
    a: "No. Orange effects unlock at the first orange path space, and red effects at the first red space. An Event is not required for the unlock. White effects remain available after orange and red unlock; a still-locked effect can be ignored while using the card's movement.",
  },
  {
    q: "Do I automatically take the Dark Detector when I reach the fifth Loyalty space?",
    a: "You must be at the fifth space or higher and farther along than the other houses. Matching the holder's position does not take it away. The final track space has a special transfer rule: a newcomer there takes the Detector, and its previous holder moves back one space and draws one card.",
  },
  {
    q: "Must my own Loyalty pawn be at five to enter the Room of Requirement?",
    a: "No. One house reaching the fifth space or beyond reveals the room for every house. It closes only when all Loyalty pawns are below five. If your castle pawn is inside when that happens, it must stay there until the room is revealed again. Each house can hold only one D.A. Coin.",
  },
  {
    q: "Can I use a D.A. Coin instead of the Dark Detector for any shield?",
    a: "No. Bring one Library Book, one Parchment Scroll and the third item actually pictured on that Defence Shield. The coin and Detector are not interchangeable. Spending the Detector also moves your Loyalty pawn back three spaces, which can affect its next holder and the Room of Requirement.",
  },
  {
    q: "Are three Progress Tokens enough for a Dark Arts victory?",
    a: "No. You also need the required Dark Arts pawns at the revealed Location simultaneously. Taking the target at the first red Event requires three pawns; waiting until the next red Event requires two. The final-space target requires one. Check where the Location Card was taken, not simply whether the marker is now red.",
  },
  {
    q: "Does the game end immediately when the Dark Arts Marker reaches the last space?",
    a: "No. Everyone draws up to five cards and Replenish becomes unavailable. Card effects and draw spaces still work. Keep playing until a House Player collects their second shield or the Dark Arts Player completes the full target objective; if all players run out of cards first, the result is a draw.",
  },
];

export const defendersTerminology: Array<{ term: string; definition: string }> = [
  {
    term: "Main Action",
    definition:
      "The one standard action chosen for your turn. Houses choose Explore, Learn or Replenish; Dark Arts chooses Explore or Replenish.",
  },
  {
    term: "Free Action",
    definition:
      "A House action available alongside the Main Action when its condition is met: use an older Hogwarts Token or gain a Parchment Scroll.",
  },
  {
    term: "Acquire Row / Advanced Acquire Row",
    definition:
      "The two separate face-up House card markets. Their Learn costs differ, and the Card Acquire Bonus Space has its own discounted Advanced option.",
  },
  {
    term: "Stunned",
    definition:
      "A pawn laid sideways that cannot move by card movement or effect. Its owner's Replenish stands it up again.",
  },
  {
    term: "Bump",
    definition:
      "Dark Arts contact caused by ending movement on a House pawn: send one chosen House pawn to the Great Hall and the attacking pawn to the Dark Arts pool.",
  },
  {
    term: "Protected Area",
    definition:
      "One of four blue-shield spaces that Dark Arts pawns cannot enter or cross. It is not a collectible Defence Shield Space.",
  },
  {
    term: "Defence Shield",
    definition:
      "A House victory item obtained by exchanging a Book, a Scroll and the pictured Coin or Detector at its space. One house needs two.",
  },
  {
    term: "Hogwarts Loyalty Track",
    definition:
      "The Side Board track for each house's fourth pawn. It determines Detector possession and whether the Room of Requirement is revealed.",
  },
  {
    term: "House Marker",
    definition:
      "A house's crest marker taken after a Dark Arts bump. Holding every participating house's marker advances the path and returns the set to its owners.",
  },
  {
    term: "Dark Arts Progress Token",
    definition:
      "The Giant, Acromantula or Dementor token chosen instead of a Dark Arts Event effect. All three are required for a Dark Arts win.",
  },
  {
    term: "Location Card",
    definition:
      "A target area. Houses use their three cards to earn Scrolls; the Dark Arts Player later draws a separate card for the simultaneous-pawn victory target.",
  },
];

export const defendersStrategy: Array<{
  title: string;
  body: string;
  sourcePages: string;
}> = [
  {
    title: "Plan around a specific shield's third item",
    body:
      "Rules-based planning: inspect the remaining shields before committing to a route. A coin route and a Detector route are not interchangeable, and spending the Detector lowers Loyalty by three. Pair the Book and Scroll trips with a shield you can actually pay for rather than collecting a third item without a destination.",
    sourcePages: "pp. 11–12, 18–19",
  },
  {
    title: "Stage two pawns for a Scroll",
    body:
      "Rules-based planning: leave one pawn in a required Location area while sending another toward a second area. Sequential visits by a lone pawn do not qualify. Reassess the route after the first Scroll replaces two cards, and remember that the second Scroll ends your Location Card supply.",
    sourcePages: "pp. 12, 17",
  },
  {
    title: "Compare Replenish with a draw-space detour",
    body:
      "Rules-based planning: House Replenish repairs a hand and clears stuns, but also advances the Dark Arts path. A Library, Bonus or Event draw does not advance it merely for drawing. When your pawns do not need recovery, compare the useful cards and travel cost of a draw route with the timing cost of Replenish; this is a trade-off, not a universal reason to avoid Replenish.",
    sourcePages: "pp. 10–12, 17, 22",
  },
  {
    title: "Use a token to connect two planned card plays",
    body:
      "Rules-based planning: choose a token whose type matches a card you expect to use on a later turn. The extra Explore can sit before or after your Main Action, but the token cannot be used on the pickup turn and you can carry only one. Check the matching card and intended destination before taking a replacement token.",
    sourcePages: "pp. 11, 17",
  },
  {
    title: "Weigh the Dark Arts target's timing against the final hand",
    body:
      "Rules-based planning: taking the red token and target early reveals where to converge but requires more pawns there simultaneously. Waiting reduces the stated target count but allows further House turns and approaches the no-Replenish phase. Position pawns with that trade-off in mind, and do not treat an advancing path or three tokens alone as a victory.",
    sourcePages: "pp. 22–23",
  },
];
