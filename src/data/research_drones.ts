import { ResearchDrone } from "../types";

export const research_drones: { [key: string]: ResearchDrone } = {
// TODO(20-12-24): namespace each drone to it's location to avoid number 
// clashing and to ease adding drones, e.g. "research_embervalley_18"
// TODO(20-12-24): sort drone entries by region. (ember valley, starlight strand, etc.)
      // conservatory
      "research_conservatory_1": {
        name: "Research Drone 1",
        log: [
            `I had the drones rebuild the conservatory
      exactly as it was before. I was so happy to
      see it standing there again, its grass
      filtering the beautiful daylight of this
      magical place.`,
            `When it was done, for a moment I almost
      thought things were back to normal. I
      though maybe I would just walk inside and
      start again like nothing had happened.`,
            `And though I know that's not the case, it
      was still so nice to finally be home again.`,
        ],
        archive: [
            `I got the idea for this conservatory from a
      history book I had as a kid. I thought it
      was so lovely, the way that you could be
      inside it but feel like you were in the
      world outside at the same time.`,
            `I wish I had something like this back home.
      Maybe then I wouldn't always have had to
      run off to look for plants and mushrooms.
      Maybe I would have been closer to them...`,
        ],
        pos: { x: 41.95, y: -8.1 },
        description: "On top of the cliff over the tunnel entrance.",
    },
    "research_conservatory_2": {
        name: "Research Drone 12",
        log: [
            `I sometimes used to bring my lunch here and
      stare at these colossal fossils, wondering
      what this world looked like when they were
      alive. It's a world of slimes now but who
      knows what it was before?`,
            `And if the universe has room for a whole
      world and its ecosystem changing course,
      maybe we should accept the same of each
      other?`,
            `Jeez, talking about the past sure resonates
      these days. I wonder what profound
      thoughts I had to share back then?`,
        ],
        archive: ["Ugh, I forgot my fork. Looks like it's hand noodles again..."],
        pos: { x: 45.39, y: -7.0 },
        description: "On a ledge up a cliff near the tunnel entrance.",
    },
    "research_conservatory_3": {
        name: "Research Drone 13",
        log: [
            `I used to be afraid of the water. It felt like
      it was endless and would just swallow you
      up. I was only ever willing to dip my feet
      in the shallows, where I could see the
      bottom, see the extent of it.`,
            `And now... what would you even call what
      I plunged into? Water so deep, so endless
      that I may never see the surface again.`,
            `I'm feeling sorry for myself again. I should
      get back to work.`,
        ],
        archive: [
            `These tidepools remind me of when I
      would go to the beach with mom and dad.
      I never wanted to swim, I was too scared
      to do it. Instead I would wade in a
      tidepool and read this old book my mom
      had about a legendary explorer. They were
      a slime rancher who trekked across the
      entire Far, Far Range, making discoveries
      that would go on to make history.`,
            `I used to dream about being someone like
      that. Being fearless and just diving into
      new adventures. I guess this is my chance.`,
        ],
        pos: { x: 50.49, y: 10.63 },
        description: "On top of a stone arch near a plot.",
    },
    "research_conservatory_4": {
        name: "Research Drone 11",
        log: [
            `I had been pacing all over the conservatory
      after it happened, my mind racing with what I
      should have done differently. I felt so guilty, so
      misguided. I ended up in these ruins, and I just
      slumped up against one of the walls, totally
      exhausted.`,
            `The stones were so solid and cold, and I felt
      the weight of the history they carried with
      them. And then a tiny bug crawling along one
      of the cracks in the wall slipped inside it and
      vanished. It passed through these ancient
      stones as if they were smoke.`,
            "That's when it all came to me.",
        ],
        archive: [
            `History is a funny thing. When you're
      young you're told how important it is, how
      it's the greatest teacher. But then you see
      the people out there with power, the ones
      making history, and they ignore the past.`,
            `I suppose I'm no different. In a way I'm out
      here trying to escape my family's history.`,
            `I'm sorry mom and dad. I'm sorry grandma.
      But I really want this.`,
        ],
        pos: { x: 31.01, y: 22.58 },
        description: "On the edge of an island next to a rock.",
    },
    "research_conservatory_5": {
        name: "Research Drone 10",
        log: [
            `Oh mushrooms, my first love. I still
      remember the day mom told me that they
      aren't actually plants, I couldn't believe it.`,
            `After I got that field guide, I would always
      sneak into the forest with grandma's old
      suitcase and collect as many as I could.
      When she found out, mom was so upset.
      But I think she was more upset about
      grandma's suitcase than anything else. I
      didn't know it was special to her.`,
        ],
        archive: [
            `Oh good, I was looking for a place to store
      all my giant mushrooms anyway.`,
            "...",
            "... ...",
            "I bet dad would have laughed at that one.",
        ],
        pos: { x: 20.67, y: -0.98 },
        description: "On top of a mushroom growing on the side of the central pillar of a cave.",
    },
    // rainbow fields
    "research_rainbowfields_1": {
        name: "Research Drone 2",
        log: [
            `Well, here we are again. I'm sending the
      drones out to all their original scouting
      locations. Once I confirm the conditions
      are the same I'll get to work.`,
            `This place... I still remember being in awe
      of these rainbow fields. It felt like being in
      a beautiful dream.`,
            `And I guess in a way it was, because it
      ended much too soon.`,
        ],
        archive: [
            `My gosh, this grass! Just look at the colors
      change as I speak! I just arrived at this
      island and I'm already finding one of the
      most unique botanical discoveries in
      recent memory?`,
            "It's all too good to be true!",
        ],
        pos: { x: 36.17, y: -35.85 },
        description: "On a small ledge next to a tree.",
    },
    "research_rainbowfields_2": {
        name: "Research Drone 3",
        log: [
            `I was so in over my head when I first
      started here. I remember hauling
      jellystone back to the conservatory by
      hand because I was so excited. Breathless
      and sweating, I was going about everything
      all wrong, but I was happy.`,
            `There's little time now, so I'll need these
      refinery links if I'm going to be efficient.`,
            "This time I'm going to do it right.",
        ],
        archive: [
            `I just found my first slime fossil on the
      island. It looks like such a happy little
      thing. You know, we still have no idea how
      these are formed? We can travel across
      the stars in the blink of an eye but we
      don't know how this goofy face ends up in
      a rock?`,
            `I think that's quite reassuring really. I'm
      glad this world still has its mysteries to
      share.`,
        ],
        pos: { x: 28.69, y: -42.95 },
        description: "Next to a cliff wall near a Refinery Link and a tunnel entrance.",
    },
    // ember valley
    "research_embervalley_1": {
        name: "Research Drone 4",
        log: [
            `The first time I was here I turned this entire
      ruined complex into a beautiful garden. I'd
      never know the original purpose of this place,
      but I thought its creators might be happy
      knowing that far into the future someone was
      making sure it still had purpose.`,
            `There's no time for that now, but I am going
      to at least plant some of my favorite flowers
      right here and hope that in time they'll
      flourish and cover these ruins once more.`,
            `Maybe if I ever make it back home I can see it
      myself.`,
        ],
        archive: [
            `Hey, you, wherever you are out there!
      This message is for whoever built this
      place:`,
            `I don't know why you built it, or what
      happened to you, but I just want to let you
      know that I'm going to plant some stuff
      here to make it look nicer.`,
            `I know I'm new here, so I don't mean to
      overstep, but if I do this, maybe some bees
      will stop by and this place will become an
      important part of the ecosystem. I hope
      that's ok with you.`,
        ],
        pos: { x: 36.89, y: -92.3 },
        description: "On a rock next to a flower bed on the lower part of the ruins.",
    },
    "research_embervalley_2": {
        name: "Research Drone 5",
        log: [
            `I know I'm on a mission here, but that
      hasn't changed anything about these
      geysers: they're still fun as heck.`,
            `I think I can afford a few minutes for a
      splash like the old days...`,
        ],
        archive: ["YAAAAAHOOOOOOOOOOO!"],
        pos: { x: 51.91, y: -106.85 },
        description: "In the open at the edge of a ledge.",
    },
    "research_embervalley_3": {
        name: "Research Drone 7",
        log: [
            `I feel at home here. When I traveled
      across the Glass Desert it was caves just
      like this one that gave me shelter and
      allowed me to survive my trek. Just feeling
      walls around me and solid ground beneath
      my feet gave me all the security I needed
      to close my eyes and make it through
      another night.`,
            `But I can do without some of it. Like if I
      ever even smell roasted cactus again I'm
      pretty sure I'd barf.`,
        ],
        archive: [
            `Caves like this have always kind of
      creeped me out. The stone walls and the
      darkness, they made me feel trapped. I
      was always more at home being outdoors,
      with the sky or at least a tree canopy
      above my head and the soil beneath my
      feet.`,
            `I suppose those feelings are the same ones
      that brought me here in the first place.`,
        ],
        pos: { x: 41.78, y: -124.03 },
        description: "Underground in a cave on a ledge protruding off a central rock pillar.",
    },
    "research_embervalley_4": {
        name: "Research Drone 8",
        log: [
            `I never managed to conclude if the prisma
      waves caused all this lava to erupt to the
      surface but I believe it did. The rainbow
      grass and iridescent rocks; all lovely to see
      and the ecosystem seems to co-exist with it
      to some degree, but this lava, this is the
      breaking point.`,
            `My guess is it started like it always does: it
      creeps up a few degrees over the years and
      you hardly notice and then one day you
      realize you're cooking.`,
            "Ugh, I wish I had a dog to pet right now.",
        ],
        archive: [
            `I think I need to just sit here for a minute
      or three to catch my breath and collect
      myself.`,
            `I was careless, too busy marveling at the
      tropical foliage here and a geyser shot me
      into the air, almost dropping me right into
      a pit of lava!`,
            `I sometimes worry I took on too much
      here... that I'm not ready to be on my
      own.`,
        ],
        pos: { x: 45.72, y: -141.06 },
        description: "On a ledge up a cliff underneath a large rock overhang.",
    },
    "research_embervalley_5": {
        name: "Research Drone 9",
        log: [
            `This gate is still sealed too, so I really must
      have been the first to enter since it was
      abandoned.`,
            `It was here that I had my first doubts. I
      thought I was talking to engineers: problem
      solvers, people who could fix what I found.
      But once we left the labyrinth and met up here
      I saw they were smiling. They were excited at
      the sight of opportunity. The company had
      sent their money people, not engineers. I don't
      think they had even considered stabilization.`,
            "It wasn't long before it all collapsed.",
        ],
        archive: [
            `And here we are, back at Ember Valley?
      The labyrinth must wrap around most of
      the island!`,
            `Jeez, how long was I even in there? Next
      time I'm definitely bringing lunch. And an
      extra fork.`,
            `In any case, I need to rest up and head
      right back in there. This is starting to feel
      like a truly amazing scientific and historical
      discovery. I need to make some calls!`,
        ],
        pos: { x: 51.54, y: -157.65 },
        description: "Inside the room past a Boom Gordo on a ruin stone.",
    },
    "research_embervalley_6": {
        name: "Research Drone 6",
        log: [
            `When I left the ranch, when I left my home, I
      thought that somehow I would prove myself.
      That I would prove to my parents that my
      choice was the right one and they would
      forgive me for not continuing their legacy.`,
            `But that's not how it worked out. And
      before I started my journey I heard that they
      had sold the ranch, and... and I just couldn't
      face them. So I left again without seeing
      them.`,
            `I regret that choice every day. I wish I could
      have said goodbye.`,
        ],
        archive: [
            `I think I've mostly tried to not think about
      leaving home. This island has so much to
      distract me, so much of it that's mine to
      study... but then I look out to the sea and
      see the sun rise and I know that they're
      seeing the sun rise like that too, and all of
      the sudden they're here with me.`,
            `I hope they're ok. And I hope that some
      day they'll say they're proud of me.`,
        ],
        pos: { x: 70.64, y: -119.22 },
        description: "At the edge of the plateau island to the side of the Ember Valley Teleporter/Tabby Gordo.",
    },
    // starlight strand
    "research_starlightstrand_1": {
        name: "Research Drone 14",
        log: [
            `The prisma waves seem to affect each area
      of the island differently, expressing a full
      spectrum of color in some places, but
      alternating between or splitting the
      spectrum in others.`,
            `And they actively change. Sometimes
      quickly and constantly, others more
      slowly. In my first year here every season
      looked different to me. It was lovely while
      it lasted.`,
        ],
        archive: [
            `What a fascinating place! I've never seen
      flora split like this before. On one side,
      beautiful, shimmering oranges and golds,
      and on the other, deep, verdant greens.
      It's extraordinary!`,
        ],
        pos: { x: -22.91, y: -52.77 },
        description: "On a small ledge at the end of a path next to the top of a waterfall.",
    },
    "research_starlightstrand_2": {
        name: "Research Drone 16",
        log: [
            `Ever since I came back, things have been a
      little fuzzy, like some of my memories
      stayed behind.`,
            `So I come here now to clear my head. I
      just let the sound of the falling water
      drown everything out and then in that
      white noise I can sometimes think clearly
      again.`,
            `But then all I see is it happening again, so I
      take a few breaths, steady myself, and get
      back to work.`,
        ],
        archive: [
            `I love this spot because it lets you take in
      so much of the island. The sounds of
      slimes hopping about, the birds chirping,
      the wind as it moves through the trees,
      and the waves of the sea all come together
      like a song.`,
            `There is music in nature if we only just sit
      and listen. And I have a whole lifetime on
      this island to do just that.`,
        ],
        pos: { x: -24.2, y: -32.87 },
        description: "On a ledge past a rock arch near a waterfall.",
    },
    "research_starlightstrand_3": {
        name: "Research Drone 17",
        log: [
            `I grew attached to this tree when I first
      discovered it. I used to sit here and tell it
      all about myself. But these days it's
      different. I see myself in it now: two
      different paths struggling against the other,
      bound to this island, and changed by it.`,
            `But unlike this tree, I hope to leave the
      island some day. I want to find a way
      home. I really do.`,
        ],
        archive: [
            `Trees like this one can live for thousands
      of years. I used to think that compared to
      us, they must perceive time very slowly,
      but then I realized that was because I was
      putting people at the center of time.`,
            `In reality, trees have been here long
      before us so their perception of time is
      closer to truth. We are here for just a
      moment before moving on, and the trees
      remain.`,
            `I wonder who else this tree will meet? I
      wonder if it will tell them about me?`,
        ],
        pos: { x: -30.71, y: -39.77 },
        description: "On a small ledge under a tree.",
    },
    "research_starlightstrand_4": {
        name: "Research Drone 15",
        log: [
            `The giant mushrooms on this island are
      responsible for maybe the greatest
      botanical discovery of my life.`,
            "Sorry, but it's a secret.",
        ],
        archive: [
            `I am a GENIUS. I've made so many great
      discoveries on this island but this latest
      one changes everything.`,
            `I found a giant mushroom cap here about
      the size of a pizza, turned it UPSIDE
      DOWN, added sauce, cheese, peppers and
      some other mushrooms, baked it and
      voila!`,
            `I'm going to call it Mega Mushroom Pizza
      and I'm going to eat it every day.`,
        ],
        pos: { x: -44.2, y: -48.2 },
        description: "On a mushroom in the open",
    },
    "research_starlightstrand_5": {
        name: "Research Drone 18",
        log: [
            `I used to start my mornings with a jog
      along this path. It felt so great to feel the
      sea breeze as I'd make my way to the
      hollow trees ahead.`,
            `Sometimes I would even come back at the
      end of my day and watch the sun set.`,
            `But I also think this is where I got robbed
      by a ringtail slime...`,
        ],
        archive: [
            `I'm feeling good today! I think I'm finally
      getting a handle on things here and I'm at
      my favorite spot ready to watch the sun
      set with a bunch of yummy cookies I baked
      all... by... myself. And you know what? I've
      earned them because I've been working so,
      so hard and wait a sec what is up with this
      statue that-`,
            "YOU HAVE GOT TO BE KIDDING ME!",
        ],
        pos: { x: -38.78, y: -17.75 },
        description: "On a small ledge on top of a cliff next to a rock.",
    },
    "research_starlightstrand_6": {
        name: "Research Drone 19",
        log: [
            `The breach is so much smaller now. It fills
      me with hope. I remember when I first
      found it I just walked right in to the
      labyrinth and began exploring its endless,
      grey halls, not even understanding what
      was really happening.`,
            `But it's not so easy this time. Whatever I
      do, I need to shut the door tight behind
      me. I can't let it all happen again after
      coming this far.`,
        ],
        archive: [
            `I thought I wasn't going to find a way into
      this place but there's a huge hole in the
      wall on this end big enough for an elephant
      to pass through! I think it's time I finally
      did some exploring inside this structure.`,
            `This feels just like when I was a kid and I'd
      sneak into the woods. It'll be just me and
      my discoveries. I feel very good. And
      excited!`,
        ],
        pos: { x: -54.06, y: -36.84 },
        description: "In the middle of the cave next to a rock and some equipment underneath the Flutter Gordo.",
    },
    // powderfall bluffs
    "research_powderfallbluffs_1": {
        name: "Research Drone 20",
        log: [
            `What an amazing discovery! This glacier wasn't
      even here when I first came to the island.
      I'm not sure how that's possible so I'm sending
      out additional drones to collect more data.`,
            `In the mean time, I am going to see if this
      'snow' is as fun as the stories I read as
      a kid...`,
        ],
        archive: [
            "",
        ],
        pos: { x: 78.15, y: -127.66 },
        description: "Underground on a small ledge next to a large cave opening.",
    },
    "research_powderfallbluffs_2": {
        name: "Research Drone 21",
        log: [
            `These auroral effects here, the ghostly trees,
      and the surfaces that materialize at night,
      are similar to the phenomena inside the Labyrinth.
      And that shouldn't be possible given the current
      state of the breach. I am begining to suspect
      that the ice shell that remains surrounding
      this glacier is amplifying the prisma waves,
      like creating an echo chamber where the
      effects in the environment are more
      concentrated.`,
        ],
        archive: [
            "",
        ],
        pos: { x: 79.6, y: -140.53 },
        description: "At the end of a side path near the edge of a cliff.",
    },
    "research_powderfallbluffs_3": {
        name: "Research Drone 22",
        log: [
            `I can hardly believe it... saber slimes?
      Everyone knows they've been extinct since some
      time after the Jellasic Period. Could this
      glacier somehow have contained them and this
      world like a time capsule? Perhaps it was frozen
      at the bottom of the Slime Sea and the seismic
      activity from Ember Valley shook it loose.`,
            "I need to keep exploring.",
        ],
        archive: [
            "",
        ],
        pos: { x: 80.77, y: -119.14 },
        description: "Underground in a small alcove from the glowing flower cave.",
    },
    "research_powderfallbluffs_4": {
        name: "Research Drone 23",
        log: [
            `While waiting for the drones to finish
      collecting their data I built a snowman. I
      had seen them before in books, and since I
      had an extra carrot, I figured it was worth
      a shot`,
            `I am no sculptor, and I immediately took
      pity on my snowman. I was glad he couldn't
      talk.`,
            `But then as the hours passed, he looked
      even worse. It was midday and the sun's rays
      were warming my cheeks. And then I realized
      why this place wasn't here before.`,
        ],
        archive: [
            "",
        ],
        pos: { x: 80.87, y: -115.27 },
        description: "On top of a snow pile at the very edge of a ledge over the water.",
    },
};
