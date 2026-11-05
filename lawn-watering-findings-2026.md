# Lawn and planter watering findings, 2026

Govind's field notes as of 2026-11-04, in his words. Weather context is added below them and labeled as modeled data.

## Lawn timeline (his words, in order)

1. started off with recommendations in the app - ie front/back lawn 3x6min / every 5d except for front lawn side patch 2x6min / every 5 days
2. soon after - side patch was browning to made it 3x6min sessions like the rest of the lawn
3. soon after - parched browning further so raised watering by 3 mins everywhere
4. soon after - started hand watering brown patches
5. soon after - started hand watering most of the front lawn as well
6. sep 5th - changed front/back lawn watering frequency to 4 days
7. oct 1st - lawn looked better - maybe because of watering or maybe because intensity of sun reduced or maybe because ground water level rose. rachio lowered watering time by 4 mins
8. nov 1 - rachio halved watering to 11 mins (ie just under 2 6 min sessions). lawn looks fine. im going to change freq back to every 5 days or even longer.

His summary: basically, the lawn needed more water than i anticipated in aug/sep. it prob built up patches in july. prior to that there might have been too much watering because grass was lush green.

Steps 1 to 5 have no dates from him. They fall between the original calcs (mid-May to June 13) and Sep 5.

## Planters and trees (his words)

1. rachio has not seasonally adjusted the planters which continue to be at 10-11 mins.
2. front planter soil is wet though when i dug up soil for something else. so i think i should back off and maybe shut it off?
3. i should also probably stop the tree bags in front.
4. i havent checked back planters soil but the bubblers are hardly giving out any water due to water pressure so ill keep it as is for now.
5. plum trees in front still dont have any new leaves. scratch tests similar- some green some brown secondary branches.
6. replaced the maple tree at the back, old one died.
7. sweet pea shrubs at the back - leaves all yellowed - should not be happening. water from bubblers is ok. pulled back mulch from stems. waiting and watching.
8. red top hedge grew only with watering through the summer direct correlation. i hand watered every 5 days.

## Weather context (modeled, not a station reading)

Source: Open-Meteo historical archive, grid point near Belmont (37.50 N, 122.24 W), pulled 2026-11-04. Temperatures are modeled daily highs and lows. ET0 is modeled reference evapotranspiration, the inches of water a well-watered reference grass loses per week. It is not CIMIS data, which the app's monthly factors use, so treat the level as approximate and the trend as reliable.

| Period | Avg high (F) | Hottest day (F) | Days at 80F or more | ET0 per week (in) | Rain (in) |
|---|---|---|---|---|---|
| May 15-31 | 69.5 | 81.4 | 1 | 1.31 | 0.41 |
| June | 72.3 | 92.3 | 3 | 1.34 | 0.09 |
| July | 72.4 | 85.1 | 2 | 1.24 | 0.27 |
| August | 73.9 | 82.2 | 2 | 1.13 | 0.06 |
| September | 74.4 | 92.6 | 7 | 1.00 | 0.10 |
| October | 73.0 | 91.1 | 10 | 0.76 | 0.58 |
| Nov 1-4 | 63.9 | 65.0 | 0 | 0.50 | 0.28 |

Hot spells: Jun 11 (92F), Sep 8-10 (up to 93F), Oct 3-4 (about 90F).

## What the weather says about the timeline

1. August and September were not hotter than June and July. Water demand was highest in June and July and fell steadily after. The browning in Aug and Sep therefore points to a shortfall that built up earlier, which matches his July theory.
2. Rough lawn need is ET0 times the app's crop factor of about 0.75. That gives about 1.0 in/wk in June, 0.93 in July, 0.85 in August, 0.75 in September and 0.57 in October. The app's flat target is 0.75 in/wk, so it ran low for June to August and matched September.
3. The Oct 1 improvement came with demand dropping to about 0.57 in/wk, plus the Sep 8-10 heat spell ending. Sun intensity falling is a better-supported cause than the water table, which no data here shows.
4. The Nov 1 cut to 11 minutes fits ET0 near 0.5 in/wk and 0.28 in of rain on Nov 1-4.
5. Rain since Oct 16 (0.58 in in October, 0.28 in Nov 1-4) supports backing off the front planter, where he already found wet soil.

## Rachio runtimes, from the monthly Seasonal Shift emails (read 2026-11-04)

Back Lawn is 3 zones and Front Lawn is 2 zones (middle and side), so per-zone minutes are the total divided by 3 or 2.

| Month | Back Lawn total | Front Lawn total | Source |
|---|---|---|---|
| Jun and Jul | 75 min | 48 min | Jul 1 email: no change from June |
| Aug | 64 | 40 | Aug 1 email: July 75 to August, Rachio cut about 15% |
| Sep | 64 | 40 | Sep 1 email: no change |
| Oct 1 | 52 | 32 | Oct 1 email: September 64 and 40 shifted down |
| mid-Oct | 61 | 40 | Nov 1 email lists October as 61 and 40, so Govind reset it by hand |
| Nov | 31 | 22 | Nov 1 email |

Rachio applies a month-over-month ratio to the current runtime: Aug x0.853, Sep x1.00, Oct x0.8125, Nov x0.51. Chained from the June peak that is 0.85, 0.85, 0.69, 0.35. The app's own monthly factors relative to July are 0.90, 0.69, 0.50, 0.31, so Rachio ran at or above the need curve from September on. The shortfall was the June and July base, not the shift. August is the exception: Rachio cut 15% against a need drop of about 10%.

Govind's recollection was no seasonal adjustment in Jun to Aug. The emails show one on Aug 1.

## What Govind said that corrected the first analysis

1. Front middle was the worst zone in Aug and Sep: a big dead ring and browning in 5 places, even though it got the most hand-watering. The first analysis called it over-watered because its average catch-can reading is the highest. The average hides the dry spots, and the cans did not sample the ring.
2. Back lawn 60 min means 20 per zone; front 40 min means 20 per zone. The reading was right.
3. The October gap between emails is a manual reset mid-October after the lawn still looked bad on Oct 1.
4. Rachio keeps its Seasonal Shift. The app says where the shift falls short and what to add on top.

## Model changes made in the app (2026-11-04)

1. Peak target raised from 0.75 to 1.1 in/wk (modeled June ET0 1.34 x Kc 0.8).
2. Runs are sized to the driest can (backyard, front middle) or the two driest (front side), not the average.
3. Front middle carries a 1.25 site factor fitted to its 2026 failure. It is a placeholder, not a measurement.
4. Front side is sized like front middle (same minutes, spacing and 1.25 factor). Its cans read about a third as high, but Govind observed it doing slightly better than the middle at equal minutes all summer, so the cans under-read it (curb rebound, slope, clay storage). An earlier version of the app capped it at 30 min and called it 38% of need. That was wrong and was removed.
5. The reality check shows Jun to Aug at 51 to 54% of need for the backyard and 64 to 69% for front middle, which matches where it browned.

## Later changes (2026-11-04)

1. Backyard is now sized on the average can, not the driest can: about 30 min per zone every 4 days in June (25 in July and August), instead of 35. Govind judged 35 too high. Frontyard middle stays on its driest can with the 1.25 site factor, and frontyard side follows the middle (see the correction below).
2. Warm stretches this summer (modeled highs, not a station): Jun 10-13 (82, 92, 80, 77), Jul 12-15, Aug 1-4 (78, 81, 82, 76), Sep 7-10 (up to 93), Sep 29 to Oct 8 (10 days at 78-91). Weekly evaporation in those stretches ran 10 to 35% over the month's norm. Rachio cut August by about 15% on Aug 1, the first day of the Aug 1-4 stretch.
3. The first-of-month check and the warm-spell rule are done in Rachio, since that is the operating app. The garden app only states them.

## Planters (Rachio emails, read 2026-11-04)

Rachio does shift the planters, but only slightly. Back Planters: 12 min in Jun and Jul, 10 min from Aug. Front Planters: 16 in Jun and Jul, 13 in Aug, 12 in Sep, 11 in Oct and Nov. Need by the app's monthly factor fell about 70% from July to November. Run spacing read from the Rachio schedule page on 2026-11-04: Front Planters every 5 days, Back Planters every 3 days (assumed the same in earlier months). On the same date Front Lawn and Back Lawn both show every 5 days.

| Month | Back planters, share of need | Front planters, share of need |
|---|---|---|
| Jun | 108% | 126% |
| Aug | 102% | 116% |
| Oct | 183% | 176% |
| Nov | 299% | 288% |

Both planters ran at or above need from June and far above it by October, which matches the wet soil Govind found in the front in early November. The back planter on a 3-day spacing is the larger surprise, though the weak bubbler pressure may mean less water arrives than Moen Flo measures. The app now recommends turning the front planter off from November to February and probing before restarting, and stopping the front tree bags until April.


## Correction on frontyard side (2026-11-04)

Govind: front side has consistently done slightly better than front middle. That contradicts the catch cans and overturns the claim that it was the most starved zone. Its early browning at 2 x 6 is still true, so 12 min every 5 days is too little in summer. The app now treats side and middle the same.
