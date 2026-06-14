import React, { useState, useEffect, useMemo } from 'react';
import { Leaf, Droplets, Sun, Calendar, AlertTriangle, CheckCircle2, Circle, Edit3, Save, X, Plus, Flower2, Sprout, TreePine, Home, Bug, Wrench, BookOpen, ChevronDown, ChevronRight, Filter, Search } from 'lucide-react';

// ============================================================
// SEED DATA
// ============================================================

const PLANTS_SEED = [
  // BACKYARD — TOPSOIL (raised bed behind 2-ft bench wall; 1 ft loose dirt + 1 ft topsoil; loosely compacted; drains in 2-3 days)
  { id: 'cop-evening', common: 'Mirror Plant — Evening Glow', sci: "Coprosma repens 'Evening Glow'", loc: 'backyard-topsoil', qty: 5, size: '5-10gal', bub: 1, recBub: 1, flow: 'low', flowRec: 'low', needMin: 1, needMax: 2, sun: 'Full sun to part sun (richer color in sun)', water: 'Low–moderate; drought-tolerant once established', soil: 'Well-drained, neutral to slightly acidic', bloom: 'Insignificant; grown for variegated foliage', issues: 'Scale, sooty mold, root rot if waterlogged', match: 'good', rationale: 'Drought-tolerant in fast-draining topsoil. Target: 1 bubbler at LOW (~1 gal/wk delivered, need 1-2).', care: 'Light shaping prune late spring. No heavy feeding needed.' },
  { id: 'cop-rainbow', common: 'Mirror Plant — Rainbow Surprise', sci: "Coprosma repens 'Rainbow Surprise'", loc: 'backyard-topsoil', qty: 5, size: '5-10gal', bub: 1, recBub: 1, flow: 'low', flowRec: 'low', needMin: 1, needMax: 2, sun: 'Full sun to part sun', water: 'Low–moderate; drought-tolerant established', soil: 'Well-drained, neutral to slightly acidic', bloom: 'Insignificant; grown for foliage', issues: 'Scale, sooty mold, root rot if waterlogged', match: 'good', rationale: 'Drought-tolerant. Target: 1 bubbler at LOW (~1 gal/wk delivered, need 1-2).', care: 'Light shaping prune late spring. No heavy feeding needed.' },
  { id: 'gardenia-1', common: 'Gardenia — Mystery', sci: "Gardenia jasminoides 'Mystery'", loc: 'backyard-topsoil', qty: 1, size: '15-20gal', bub: 2, recBub: 2, flow: 'med', flowRec: 'med', needMin: 5, needMax: 7, sun: 'Morning sun, afternoon shade ideal in coastal CA', water: 'Consistent moisture, never soggy; acid pH 5.0–6.0', soil: 'Rich, acidic, well-drained, organic-amended', bloom: 'Heavy May–July; lighter repeat flush in fall; intensely fragrant', issues: 'ACTIVE: mealybug. Also chlorosis (iron/Mg/N), aphids, sooty mold, bud drop from stress', match: 'risk', rationale: '15-20gal moisture-lover in fast-draining topsoil. Target: 2 bubblers at MED (~4.9 gal/wk delivered, need 5-7) — borderline-under by math but empirically growing through mealybug treatment. Bump to HIGH if leaves scorch or yellowing intensifies.', care: 'Acid-loving — needs iron chelate + low-pH organic matter. Light prune after summer bloom flush.' },
  { id: 'boug-purple', common: 'Bougainvillea — Purple', sci: 'Bougainvillea spectabilis (Purple)', loc: 'backyard-topsoil', qty: 1, size: '15-20gal', bub: 2, recBub: 2, flow: 'low', flowRec: 'low', needMin: 2, needMax: 4, sun: 'Full sun, minimum 6 hr', water: 'Low; let dry between waterings — drought stress drives bloom', soil: 'Well-drained, slightly acidic to neutral', bloom: 'Spring–fall; peak summer; flushes triggered by drought stress', issues: 'Bougainvillea looper (caterpillar — chewed leaves), leaf miner, aphids, mealybug, root rot', match: 'good', rationale: 'Target: 2 bubblers at LOW (~2 gal/wk delivered, need 2-4 — at low end of range, which encourages bloom). 2 bubblers spaced 1.5-2 ft apart cover root zone better than 1 at higher flow.', care: 'Low-N fertilizer (high P-K). Hard prune late winter. Pinch tips after each bloom flush. Watch for looper at dusk.' },
  { id: 'boug-orange', common: "Bougainvillea — Orange King", sci: "Bougainvillea 'Orange King'", loc: 'backyard-topsoil', qty: 1, size: '15-20gal', bub: 2, recBub: 2, flow: 'low', flowRec: 'low', needMin: 2, needMax: 4, sun: 'Full sun, min 6 hr', water: 'Low; drought stress drives bloom', soil: 'Well-drained, slightly acidic to neutral', bloom: 'Spring–fall; peak summer', issues: 'Looper, leaf miner, aphids, mealybug, root rot', match: 'good', rationale: 'Target: 2 bubblers at LOW (~2 gal/wk delivered, need 2-4). Drought stress drives bloom.', care: 'Low-N fertilizer. Hard prune late winter. Pinch tips after blooms.' },
  { id: 'boug-white', common: 'Bougainvillea — Jamaica White', sci: "Bougainvillea 'Jamaica White'", loc: 'backyard-topsoil', qty: 1, size: '15-20gal', bub: 2, recBub: 2, flow: 'low', flowRec: 'low', needMin: 2, needMax: 4, sun: 'Full sun, min 6 hr', water: 'Low; drought stress drives bloom', soil: 'Well-drained, slightly acidic to neutral', bloom: 'Spring–fall; peak summer', issues: 'Looper, leaf miner, aphids, mealybug, root rot', match: 'good', rationale: 'Target: 2 bubblers at LOW (~2 gal/wk delivered, need 2-4). Drought stress drives bloom.', care: 'Low-N fertilizer. Hard prune late winter. Pinch tips after blooms.' },
  { id: 'azalea', common: 'Azalea — Happy Days', sci: "Rhododendron 'Happy Days' (Encore series — Pink/Violet)", loc: 'backyard-topsoil', qty: 1, size: '5-10gal', bub: 1, recBub: 1, flow: 'high', flowRec: 'high', needMin: 3, needMax: 5, sun: 'Dappled / morning sun, afternoon shade', water: 'Consistent moisture; shallow roots dry fast', soil: 'Acidic (4.5–5.5), peaty, well-drained, organic', bloom: 'Spring (April–May); Encore series may rebloom late summer', issues: 'Lace bug (silvering of leaves), petal blight, root rot, chlorosis, sun scorch', match: 'risk', rationale: 'Shallow-rooted moisture-lover in fast-draining topsoil. Target: 1 bubbler at HIGH (~4.3 gal/wk delivered, need 3-5). Root ball ~12" wide, 1 well-placed bubbler covers it.', care: 'Acid food + iron chelate. Prune lightly right after spring bloom — buds set on summer growth. Mulch base but keep mulch off the crown.' },
  { id: 'ceanothus', common: 'California Lilac — Skylark', sci: "Ceanothus thyrsiflorus 'Skylark'", loc: 'backyard-topsoil', qty: 1, size: '5-10gal', bub: 1, recBub: 1, flow: 'low', flowRec: 'low', needMin: 0, needMax: 1, sun: 'Full sun', water: 'VERY low once established; SUMMER WATER OFTEN FATAL', soil: 'Lean, very well-drained', bloom: 'Late spring (April–June); cobalt blue', issues: 'Root rot from summer water, aphids on tender growth', match: 'risk', rationale: 'CA native that resents summer irrigation. Target: 1 bubbler at LOW (~1 gal/wk delivered, need 0-1 — at upper limit). Consider OFF Jun-Sep if you can isolate this bubbler. Do NOT fertilize.', care: 'No fertilizer. No summer pruning. Light shape after bloom only. If sudden wilt → likely root rot, no save.' },
  { id: 'anigozanthos', common: 'Kangaroo Paw — Big Red', sci: "Anigozanthos 'Big Red'", loc: 'backyard-topsoil', qty: 2, size: '5-10gal', bub: 1, recBub: 1, flow: 'low', flowRec: 'low', needMin: 1, needMax: 2, sun: 'Full sun', water: 'Low–moderate; drought-tolerant', soil: 'Sandy, lean, very well-drained', bloom: 'Spring–summer (May–August); deep red felted spikes', issues: 'Ink spot fungus (black streaks on leaves), root rot, snails on flower stalks', match: 'good', rationale: 'Drought-tolerant. Target: 1 bubbler at LOW (~1 gal/wk delivered, need 1-2).', care: 'No heavy feeding. Cut spent bloom stalks to base. Cut back hard every 2-3 years to rejuvenate.' },
  { id: 'salvia-micro', common: 'Baby Sage', sci: 'Salvia microphylla', loc: 'backyard-topsoil', qty: 5, size: '5-10gal', bub: 1, recBub: 1, flow: 'low', flowRec: 'low', needMin: 1, needMax: 2, sun: 'Full sun', water: 'Low–moderate', soil: 'Well-drained', bloom: 'Near-continuous spring through fall', issues: 'Powdery mildew if crowded, spider mites in heat', match: 'good', rationale: 'Mediterranean profile. Target: 1 bubbler at LOW (~1 gal/wk delivered, need 1-2).', care: 'Deadhead spent flowers for continuous bloom. Cut back 1/3 in late winter.' },
  { id: 'escallonia', common: 'Escallonia — Fradesii', sci: "Escallonia 'Fradesii'", loc: 'backyard-topsoil', qty: 1, size: '15-20gal', bub: 2, recBub: 2, flow: 'med', flowRec: 'med', needMin: 4, needMax: 6, sun: 'Full sun to part shade', water: 'Moderate', soil: 'Well-drained, slightly acidic', bloom: 'Pink, long bloom (spring through fall)', issues: 'Leaf spot, scale', match: 'good', rationale: '15-20gal moderate. Target: 2 bubblers at MED (~4.9 gal/wk delivered, need 4-6). Match.', care: 'Light shaping post-bloom flushes. Standard feed schedule.' },
  { id: 'agapanthus', common: 'African Blue Lily', sci: 'Agapanthus praecox', loc: 'backyard-topsoil', qty: 9, size: '5-10gal', bub: 1, recBub: 1, flow: 'med', flowRec: 'med', needMin: 2, needMax: 3, sun: 'Full sun to part sun', water: 'Moderate', soil: 'Well-drained', bloom: 'Blue umbels, summer (June–August)', issues: 'Snails on emerging shoots, agapanthus gall midge (rare in CA), root rot', match: 'good', rationale: 'Moderate. Target: 1 bubbler at MEDIUM (~2.3 gal/wk delivered, need 2-3).', care: 'Cut spent bloom stalks at base. Divide every 4-5 years if congested.' },
  { id: 'maple-back', common: 'Japanese Maple (backyard)', sci: 'Acer palmatum', loc: 'backyard-topsoil', qty: 1, size: 'small-tree', bub: 2, recBub: 2, flow: 'high', flowRec: 'high', needMin: 8, needMax: 12, sun: 'Morning sun, afternoon shade required (leaf scorch otherwise)', water: 'Consistent moisture; root zone shouldn\'t fully dry', soil: 'Well-drained, acidic to neutral, organic', bloom: 'Insignificant; grown for foliage', issues: 'Leaf scorch, anthracnose, verticillium wilt, aphids', match: 'good', rationale: 'Tree-scale moisture-lover in fast-draining topsoil. Target: 2 bubblers at HIGH (~8.7 gal/wk delivered, need 8-12). At low end of need — clay/topsoil layering may help retain. Position bubblers 2-3 ft apart for root coverage.', care: 'Prune ONLY in dormant season (Dec-Jan); summer pruning bleeds sap and stresses tree. Mulch generously. Acid food + iron chelate ideal.' },
  { id: 'polygala', common: 'Sweet Pea Bush', sci: 'Polygala myrtifolia', loc: 'backyard-topsoil', qty: 5, size: '5-10gal', bub: 1, recBub: 1, flow: 'low', flowRec: 'low', needMin: 1, needMax: 2, sun: 'Full sun to part shade', water: 'Low–moderate; root rot prone', soil: 'Very well-drained', bloom: 'Purple pea-like flowers, near-continuous in mild climate', issues: 'Root rot, leaf spot, gets leggy without pruning', match: 'good', rationale: 'Rot-prone. Topsoil drainage saves it. Target: 1 bubbler at LOW (~1 gal/wk delivered, need 1-2).', care: 'Tip prune frequently to keep dense — gets leggy fast. No heavy feeding.' },
  { id: 'eupat-back', common: 'Dog Fennel (backyard)', sci: 'Eupatorium capillifolium', loc: 'backyard-topsoil', qty: 4, size: '5-10gal', bub: 1, recBub: 1, flow: 'low', flowRec: 'low', needMin: 1, needMax: 2, sun: 'Full sun', water: 'Low–moderate', soil: 'Tolerates poor soil; well-drained preferred', bloom: 'Late summer/fall; insignificant whitish plumes', issues: 'Aphids; gets very tall (6-10 ft) and floppy without cutback', match: 'good', rationale: 'Tolerant. Target: 1 bubbler at LOW (~1 gal/wk delivered, need 1-2).', care: 'Cut back hard in late winter to control height. Pinch in spring for bushiness.' },
  { id: 'ligustrum-jap', common: 'Japanese Privet', sci: 'Ligustrum japonicum', loc: 'backyard-topsoil', qty: 1, size: '15-20gal', bub: 1, recBub: 1, flow: 'high', flowRec: 'high', needMin: 4, needMax: 6, sun: 'Full to part sun', water: 'Moderate; drought-tolerant established', soil: 'Adaptable, well-drained', bloom: 'White panicles, late spring/early summer; fragrant', issues: 'Scale, sooty mold, leaf spot', match: 'good', rationale: 'Target: 1 bubbler at HIGH (~4.6 gal/wk delivered, need 4-6). Adaptable.', care: 'Shape after spring growth flush. Standard feed if vigor needed.' },
  { id: 'loropetalum', common: 'Chinese Fringe Flower — Razzleberri', sci: "Loropetalum chinense 'Razzleberri'", loc: 'backyard-topsoil', qty: 1, size: '5-10gal', bub: 2, recBub: 2, flow: 'low', flowRec: 'low', needMin: 2, needMax: 3, sun: 'Full sun (best burgundy color) to part shade', water: 'Moderate', soil: 'Acidic, well-drained', bloom: 'Pink fringe-flowers in spring (Mar–April), light rebloom', issues: 'Chlorosis on alkaline soil (yellowing between veins), anthracnose', match: 'good', rationale: 'Target: 2 bubblers at LOW (~2.1 gal/wk delivered, need 2-3). 2 bubblers spread coverage better than 1 stronger bubbler.', care: 'Acid food + iron chelate if leaves yellow between veins. Prune after spring bloom.' },
  { id: 'mesem', common: 'Heartleaf Iceplant', sci: 'Mesembryanthemum cordifolium (Aptenia cordifolia)', loc: 'backyard-topsoil', qty: 1, size: '5-10gal', bub: 1, recBub: 1, flow: 'med', flowRec: 'med', needMin: 2, needMax: 3, sun: 'Full sun', water: 'Moderate — actively grows with consistent water; goes semi-dormant if dry. Not a true desert succulent.', soil: 'Well-drained', bloom: 'Pink/magenta daisy-like, spring–summer', issues: 'Rot from prolonged saturation, mealybug', match: 'good', rationale: 'South African mesemb — actively grows with summer water (your observation: thrives in rain, dormant when dry). Target: 1 bubbler at MEDIUM (~2.3 gal/wk delivered, need 2-3) keeps it green through summer.', care: 'No fertilizer needed. Trim back if it overgrows neighbors.' },
  { id: 'euonymus', common: 'Japanese Spindle', sci: 'Euonymus japonicus', loc: 'backyard-topsoil', qty: 4, size: '5-10gal', bub: 1, recBub: 1, flow: 'med', flowRec: 'med', needMin: 2, needMax: 3, sun: 'Full to part sun', water: 'Moderate', soil: 'Well-drained', bloom: 'Insignificant', issues: 'POWDERY MILDEW (very prone in coastal humidity), euonymus scale, anthracnose', match: 'watch', rationale: 'Target: 1 bubbler at MEDIUM (~2.3 gal/wk delivered, need 2-3). Watch for white powdery coating — common here.', care: 'If powdery mildew appears: improve air flow (light prune for openness), apply potassium bicarbonate or neem.' },

  // BACKYARD — GROUND (a few inches topsoil over native; surprisingly fast drainage — soil dry at 6-12" depth within 12 hrs of watering)
  { id: 'carpenteria', common: 'Bush Anemone — Elizabeth', sci: "Carpenteria californica 'Elizabeth'", loc: 'backyard-ground', qty: 2, size: '15-20gal', bub: 1, recBub: 1, flow: 'med', flowRec: 'low', needMin: 2, needMax: 3, sun: 'Full sun to part shade; CA native', water: 'Low; CA native dislikes wet feet', soil: 'Wants well-drained lean — your shallow-topsoil-over-native setup is acceptable', bloom: 'CURRENTLY FLOWERING — white with yellow centers, May–July, fragrant', issues: 'Aphids on new growth, root rot from summer water, morning droop is heat response (NOT thirst)', match: 'risk', rationale: 'Drought-loving CA native. Target: 1 bubbler at LOW (~1 gal/wk delivered, need 2-3 by spec but native tolerates less). Currently at MED (~2.5 gal/wk) — at upper end of need. Both plants growing well so leave at MED for now; drop to LOW if any sudden wilt or stem darkening.', care: 'No fertilizer. Light prune after summer bloom flush. Don\'t water in response to morning wilt — it bounces back at evening.' },
  { id: 'phormium', common: 'New Zealand Flax', sci: 'Phormium tenax', loc: 'backyard-ground', qty: 1, size: '5-10gal', bub: 1, recBub: 1, flow: 'med', flowRec: 'med', needMin: 1, needMax: 2, sun: 'Full sun', water: 'Low–moderate; drought-tolerant; tolerates clay', soil: 'Adaptable', bloom: 'Tall reddish bloom stalks (uncommon in cultivated; needs maturity)', issues: 'MEALYBUG (severe — hides in leaf bases), scale, fungal leaf spot in wet conditions', match: 'good', rationale: '5-10gal drought-tolerant. Target: 1 bubbler at MED (~2.5 gal/wk delivered, need 1-2). Slightly over but Phormium is forgiving; clay tolerated.', care: 'Pull (don\'t cut) brown outer leaves at base. Inspect leaf bases for mealybug periodically.' },
  { id: 'hippeastrum', common: 'Striped Barbados Lily', sci: 'Hippeastrum striatum', loc: 'backyard-ground', qty: 2, size: '5-10gal', bub: 1, recBub: 1, flow: 'low', flowRec: 'low', needMin: 1, needMax: 2, sun: 'Bright filtered to morning sun', water: 'Moderate during growth/bloom; drier rest after foliage dies back', soil: 'Well-drained', bloom: 'Red striped trumpets, spring (March–May)', issues: 'Red blotch (Stagonospora — orange/red spots on bulb/leaves), bulb rot, mealybug', match: 'good', rationale: 'Target: 1 bubbler at LOW (~1 gal/wk delivered, need 1-2 during growth). Bulb wants dry period after foliage dies back.', care: 'Let foliage die back naturally after bloom — feeds bulb. Light feed in growth period only.' },

  // FRONTYARD — GROUND (thin topsoil over Belmont native clay; bark mulch; moderate drainage)
  { id: 'photinia', common: 'Red Tip Photinia HEDGE', sci: 'Photinia × fraseri', loc: 'frontyard-ground', qty: 9, size: '15-20gal', bub: 1, recBub: 1, flow: 'med', flowRec: 'low', needMin: 2, needMax: 3, sun: 'Full sun to part shade', water: 'Moderate; clay + bubblers + lawn humidity = damp microclimate', soil: 'Well-drained, slightly acidic (clay is suboptimal)', bloom: 'White panicles, spring — but bloom encourages disease, often pruned off', issues: 'ACTIVE: Entomosporium leaf spot. Also fire blight, scale.', match: 'watch', rationale: 'Target: 1 bubbler at LOW each (~1 gal/wk delivered, need 2-3). Intentionally below need — disease pressure caps the water you should give. Sanitation matters more than water.', care: 'See active treatment. AVOID fall pruning. Sanitize pruners between plants. Rake fallen leaves weekly.' },
  { id: 'ligustrum-tex', common: 'Wax Leaf Privet', sci: "Ligustrum japonicum 'Texanum'", loc: 'frontyard-ground', qty: 8, size: 'small-tree', bub: 1, recBub: 1, flow: 'high', flowRec: 'high', needMin: 4, needMax: 7, sun: 'Full to part sun', water: 'Moderate', soil: 'Adaptable to clay', bloom: 'White, late spring; fragrant', issues: 'Scale, sooty mold, leaf spot', match: 'good', rationale: 'Privet at small-tree size, 8-plant block. Target: 1 bubbler at HIGH (~4.6 gal/wk delivered, need 4-7). Privet is highly drought-tolerant once established — at lower end of need is fine.', care: 'Shape after spring flush. Tolerant of regular hedge trimming.' },
  { id: 'maple-front', common: 'Japanese Maple (frontyard)', sci: 'Acer palmatum', loc: 'frontyard-ground', qty: 1, size: '15-20gal', bub: 1, recBub: 1, flow: 'high', flowRec: 'high', needMin: 5, needMax: 7, sun: 'Morning sun, afternoon shade required', water: 'Consistent moisture — clay actually GOOD for this species', soil: 'Well-drained acidic ideal; clay tolerated and moisture-retentive', bloom: 'Insignificant; grown for foliage', issues: 'Leaf scorch, anthracnose, verticillium wilt (clay can harbor this), aphids', match: 'good', rationale: '15-20gal moisture-lover in clay. Target: 1 bubbler at HIGH (~4.6 gal/wk delivered, need 5-7) — slightly under math but clay holds moisture for moisture-lover roots. Watch for scorch in summer; bump to 2 bubblers if it appears.', care: 'Prune ONLY Dec–Jan. Mulch generously. Acid food + iron chelate ideal.' },
  { id: 'camellia', common: 'Japanese Camellia', sci: 'Camellia japonica', loc: 'frontyard-ground', qty: 1, size: 'small-tree', bub: 1, recBub: 1, flow: 'high', flowRec: 'high', needMin: 6, needMax: 9, sun: 'Morning sun, afternoon shade; bright shade', water: 'Consistent moisture; acid pH 5.5–6.5; clay is FAVORABLE', soil: 'Rich, acidic, well-drained, organic — clay tolerated', bloom: 'Late winter–early spring (January–April depending on cultivar)', issues: 'Petal blight (brown decaying flowers), scale, sooty mold, chlorosis, sun scorch', match: 'watch', rationale: 'Small tree size moisture-lover in clay. Target: 1 bubbler at HIGH (~4.6 gal/wk delivered, need 6-9) — under math but clay compensates. If chlorosis worsens or scorch appears, bump to 2 bubblers.', care: 'CRITICAL: rake fallen petals to prevent petal blight. Acid food + iron chelate. Light prune after bloom (Feb–March).' },
  { id: 'lavandula', common: 'French Lavender — Gray', sci: 'Lavandula dentata var. candicans', loc: 'frontyard-ground', qty: 5, size: '5-10gal', bub: 1, recBub: 1, flow: 'low', flowRec: 'low', needMin: 0, needMax: 1, sun: 'Full sun', water: 'Very low once established; clay is suboptimal long-term', soil: 'Wants well-drained lean alkaline; clay is a poor match', bloom: 'Near year-round in mild climate, peak spring/summer', issues: 'Root rot from clay + irrigation, leggy/woody if not pruned', match: 'risk', rationale: 'Mediterranean drought-lover. Target: 1 bubbler at LOW (~1 gal/wk delivered, need 0-1 — at upper limit). Has been growing fine. Plan 5-7 yr lifespan in clay.', care: 'NEVER fertilize. Light shape after each bloom flush. NEVER cut into bare/old wood.' },
  { id: 'eupat-front', common: 'Dog Fennel (frontyard)', sci: 'Eupatorium capillifolium', loc: 'frontyard-ground', qty: 4, size: '5-10gal', bub: 1, recBub: 1, flow: 'low', flowRec: 'low', needMin: 1, needMax: 2, sun: 'Full sun', water: 'Low–moderate', soil: 'Tolerates poor; well-drained preferred', bloom: 'Late summer/fall; insignificant whitish plumes', issues: 'Aphids; tall and floppy without cutback', match: 'good', rationale: 'Tolerant. Target: 1 bubbler at LOW (~1 gal/wk delivered, need 1-2).', care: 'Cut back hard in late winter. Pinch in spring for bushiness.' },
  { id: 'leptospermum', common: 'NZ Tea Tree (Manuka)', sci: 'Leptospermum scoparium', loc: 'frontyard-ground', qty: 1, size: '15-20gal', bub: 1, recBub: 1, flow: 'med', flowRec: 'med', needMin: 2, needMax: 4, sun: 'Full sun', water: 'Low–moderate; drought-tolerant; clay is suboptimal (prefers well-drained acidic)', soil: 'Wants well-drained acidic; clay creates root-zone moisture issues', bloom: 'White/pink/red (cultivar-dependent), late winter–spring', issues: 'Scale, web blight (silken webs in dense growth), root rot from wet feet', match: 'watch', rationale: '15-20gal drought-tolerant. Target: 1 bubbler at MED (~2.5 gal/wk delivered, need 2-4). Match. Watch for sudden branch dieback (root rot signature in clay).', care: 'Light shape after bloom only — does NOT respond well to hard prune. Acid food if vigor needed.' },

  // FRONTYARD — LAWN (NEW small trees, watered by lawn sprinklers — NOT bubblers)
  { id: 'cassia', common: 'Gold Medallion Tree (NEW, small)', sci: 'Cassia leptophylla (Senna leptophylla)', loc: 'frontyard-ground', qty: 2, size: '15-20gal', bub: 0, recBub: 0, waterSource: 'sprinkler', sun: 'Full sun', water: 'Low once established (3+ yrs); higher water needs while establishing', soil: 'Wants well-drained; clay + lawn sprinklers = wet for a drought-tolerant species', bloom: 'Brilliant yellow clusters, late summer (July–September)', issues: 'Chlorosis on alkaline soil, root rot from saturated clay (long-term risk), aphids on new growth', match: 'watch', rationale: 'NEW small tree on lawn sprinklers in clay. Lawn schedule fine for establishment (yrs 1-2). Long-term concern: drought-tolerant species in wet clay. By yr 3, evaluate reducing lawn water near the tree.', care: 'Minimal pruning — shape only. Iron chelate if chlorotic. Water deep but infrequent once established to encourage deeper roots.' },
  { id: 'plum', common: 'Flowering Plum — Krauter Vesuvius (NEW, small)', sci: "Prunus cerasifera 'Krauter Vesuvius'", loc: 'frontyard-ground', qty: 2, size: '15-20gal', bub: 0, recBub: 0, waterSource: 'sprinkler', sun: 'Full sun', water: 'Moderate; tolerates lawn schedule', soil: 'Adaptable to clay', bloom: 'Pink, very early spring (Feb–March), before purple foliage', issues: 'APHIDS (heavy spring infestation common), shothole borer, peach leaf curl, brown rot, scale', match: 'good', rationale: 'NEW small tree on lawn sprinklers. Plum tolerates regular shallow lawn schedule fine.', care: 'CRITICAL: dormant copper spray late winter (Dec–Jan) and at bud swell — prevents peach leaf curl. Prune in summer after bloom (winter pruning causes silver leaf disease).' },
  { id: 'tristaniopsis', common: 'Water Gum (NEW, small)', sci: 'Tristaniopsis laurina', loc: 'frontyard-ground', qty: 1, size: '15-20gal', bub: 0, recBub: 0, waterSource: 'sprinkler', sun: 'Full sun to part shade', water: 'Moderate; tolerates more moisture than most — clay + lawn = ideal', soil: 'Adaptable; tolerates clay better than most trees', bloom: 'Small fragrant yellow flowers, summer', issues: 'Chlorosis on alkaline soil, scale', match: 'good', rationale: 'NEW small tree on lawn sprinklers. Of the three lawn trees, this one is the best soil-match — Water Gum naturally tolerates more moisture.', care: 'Minimal pruning. Iron chelate if leaves yellow.' },

  // BACKYARD — SELF-SUSTAINING (mature trees, deep roots / water table, no irrigation)
  { id: 'bottlebrush', common: 'Weeping Bottlebrush (mature tree)', sci: 'Melaleuca viminalis (syn. Callistemon viminalis)', loc: 'backyard-ground', qty: 1, size: 'big-tree', bub: 0, recBub: 0, waterSource: 'natural', sun: 'Full sun', water: 'Self-sustaining via deep roots / high water table', soil: 'Adaptable', bloom: 'Red bottlebrush spikes, spring (April–June) and sporadic through year', issues: 'Chlorosis (iron deficiency on alkaline soil), scale, root weevils', match: 'good', rationale: 'Mature tree with deep roots accessing the water table. No irrigation needed.', care: 'Iron chelate if leaves yellow between veins. Minimal pruning — remove deadwood as it appears. Hand-water only if extended drought + visible distress.' },
  { id: 'cordyline-aus', common: 'NZ Cabbage Tree', sci: 'Cordyline australis', loc: 'backyard-ground', qty: 1, size: 'big-tree', bub: 0, recBub: 0, waterSource: 'natural', sun: 'Full sun to part shade', water: 'Self-sustaining — flourishing without irrigation for over a year', soil: 'Adaptable', bloom: 'Cream panicles, fragrant, summer (only on mature specimens, irregular)', issues: 'Leaf spot in wet conditions, scale, slugs on young foliage', match: 'good', rationale: 'No irrigation — has gone over a year without watering and is flourishing. Deep roots accessing the water table.', care: 'Trim brown lower leaves for tidy look. Cut top off if it gets too tall — will resprout from base. Hand-water only if extended drought + visible distress.' },

  // INDOOR (pots, topsoil; bright indirect; Ti & Dracaena get some direct; hand-watered drench schedule)
  { id: 'zz', common: 'ZZ Plant', sci: 'Zamioculcas zamiifolia', loc: 'indoor', qty: 1, size: 'pot', bub: 0, recBub: 0, indoorFreqDays: 14, sun: 'Bright indirect (tolerates low)', water: 'Drench every 14 days (your schedule). ZZ is drought-tolerant — 14 days is appropriate; could even stretch to 21 days in winter.', soil: 'Well-drained potting mix', bloom: 'Rare indoors', issues: 'Root/rhizome rot from overwatering (most common cause of death)', match: 'good', rationale: 'Hand-watered drench every 14 days — appropriate for drought-tolerant species. Skip if soil still moist 2"+ down.', care: 'Wipe leaves monthly to keep glossy. Half-strength balanced feed monthly Mar–Oct only.' },
  { id: 'pothos', common: 'Golden Pothos', sci: 'Epipremnum aureum', loc: 'indoor', qty: 1, size: 'pot', bub: 0, recBub: 0, indoorFreqDays: 7, sun: 'Low to bright indirect', water: 'Drench every 7 days (your schedule). Adaptable; will tell you if thirsty (slight droop).', soil: 'Well-drained potting mix', bloom: 'Effectively never indoors', issues: 'Root rot, mealybug, leaf yellowing from overwater', match: 'good', rationale: 'Hand-watered drench every 7 days. Adaptable.', care: 'Prune for fullness — vines get bare at base. Half-strength feed monthly Mar–Oct.' },
  { id: 'peace-lily', common: 'Peace Lily', sci: 'Spathiphyllum sp.', loc: 'indoor', qty: 1, size: 'pot', bub: 0, recBub: 0, indoorFreqDays: 7, sun: 'Medium to bright indirect', water: 'Drench every 7 days (your schedule). Will droop dramatically if it ever dries out.', soil: 'Standard potting mix', bloom: 'White spathes; spring–fall with adequate light', issues: 'BROWN TIPS from fluoride/chlorine in tap water; low humidity', match: 'good', rationale: 'Hand-watered drench every 7 days. Suits this thirsty species.', care: 'Use filtered/sat water for fewer brown tips. Half-strength feed monthly Mar–Oct.' },
  { id: 'dracaena', common: 'Corn Plant', sci: 'Dracaena fragrans', loc: 'indoor', qty: 1, size: 'pot', bub: 0, recBub: 0, indoorFreqDays: 7, sun: 'Bright indirect; tolerates some direct (your setup)', water: 'Drench every 7 days (your schedule). Sensitive to fluoride.', soil: 'Well-drained potting mix', bloom: 'Rare; fragrant cream when it occurs', issues: 'BROWN TIPS from fluoride/chlorine, root rot, mealybug, spider mites in dry air', match: 'good', rationale: 'Hand-watered drench every 7 days. Use filtered water if you can.', care: 'Wipe leaves monthly. Half-strength feed monthly Mar–Oct.' },
  { id: 'fiddle-leaf', common: 'Fiddle Leaf Fig', sci: 'Ficus lyrata', loc: 'indoor', qty: 1, size: 'pot', bub: 0, recBub: 0, indoorFreqDays: 14, sun: 'Bright indirect; needs lots of light', water: 'Drench every 14 days (your schedule). 14 days is on the long side for FLF in active growth (spring/summer); if leaves drop or droop, shorten to 10 days. 14 days is appropriate for fall/winter.', soil: 'Well-drained potting mix', bloom: 'Effectively never indoors', issues: 'Leaf drop from inconsistent care, root rot, brown spots (multiple causes), spider mites', match: 'watch', rationale: 'Hand-watered drench every 14 days. Slightly long for active growth season — monitor for leaf drop. Consistency matters more than frequency for FLF.', care: 'Rotate pot weekly for even growth. Doesn\'t like to move locations. Half-strength feed monthly Mar–Oct. Wipe leaves monthly.' },
  { id: 'ti', common: 'Ti Plant', sci: 'Cordyline fruticosa', loc: 'indoor', qty: 1, size: 'pot', bub: 0, recBub: 0, indoorFreqDays: 7, sun: 'Bright indirect with some direct (your setup)', water: 'Drench every 7 days (your schedule). Sensitive to fluoride.', soil: 'Well-drained potting mix', bloom: 'Rare indoors', issues: 'BROWN TIPS from fluoride/chlorine, spider mites in dry air, leaf drop from low humidity', match: 'good', rationale: 'Hand-watered drench every 7 days. Filtered water reduces tip browning.', care: 'Maintain humidity above 50% if possible. Half-strength feed monthly Mar–Oct.' },
  { id: 'peperomia', common: 'Baby Rubber Plant', sci: 'Peperomia obtusifolia', loc: 'indoor', qty: 1, size: 'pot', bub: 0, recBub: 0, indoorFreqDays: 7, sun: 'Medium to bright indirect', water: 'Drench every 7 days (your schedule). Semi-succulent — 7 days is on the wetter side; if leaves get soft/droopy, stretch to 10 days.', soil: 'Well-drained potting mix', bloom: 'Greenish-white spikes occasionally', issues: 'Rot from overwatering (most common), mealybug', match: 'watch', rationale: 'Hand-watered drench every 7 days. Semi-succulent prefers underwater — monitor for rot (soft stems = back off).', care: 'Pinch tips for bushiness. Light feeder — quarter-strength feed every 6 weeks Mar–Oct.' },
  { id: 'begonia-rex', common: 'King Begonia', sci: 'Begonia rex (Rex Begonia)', loc: 'indoor', qty: 1, size: 'pot', bub: 0, recBub: 0, indoorFreqDays: 7, sun: 'Bright indirect; NO direct sun (burns)', water: 'Drench every 7 days (your schedule). Wants high humidity.', soil: 'Light, peaty potting mix', bloom: 'Small pink, secondary to foliage display', issues: 'POWDERY MILDEW, leaf edge browning from low humidity, mealybug, root rot from overwater', match: 'good', rationale: 'Hand-watered drench every 7 days. Air circulation helps prevent powdery mildew.', care: 'High humidity ideal — group with other plants or use pebble tray. Half-strength feed monthly Mar–Oct. Cut spent flower stems.' },
];

// ============================================================
// TREATMENT PLANS
// ============================================================

const TREATMENTS = [
  {
    id: 'photinia-ento',
    title: 'Entomosporium Leaf Spot — Red Tip Photinia Hedge',
    plants: ['photinia'],
    severity: 'active',
    summary: '9-plant hedge with active fungal infection. Treatment in progress with fungicide on hand. Combination of chemical control + sanitation + cultural changes.',
    steps: [
      { id: 'p1', text: 'Continue fungicide application on label interval (typically every 7–14 days during active disease pressure). Reapply after rain.', when: 'Ongoing' },
      { id: 'p2', text: 'Rake and BAG (do NOT compost) all fallen leaves weekly. Spores overwinter in fallen debris.', when: 'Weekly through bloom + after each leaf drop' },
      { id: 'p3', text: 'Sanitize pruners between EACH plant: 10% bleach solution or 70% isopropyl alcohol. Disease moves on tools.', when: 'Every prune session' },
      { id: 'p4', text: 'Remove and bag any heavily infected leaves from the plants directly during active treatment.', when: 'Bi-weekly inspection' },
      { id: 'p5', text: 'Avoid overhead watering — bubblers are correct. Water in morning so any wet foliage dries before evening.', when: 'Confirmed (current setup)' },
      { id: 'p6', text: 'DO NOT prune in fall. Fall pruning forces tender new growth that is highly susceptible. Prune (if needed) in late spring/early summer ONLY, after bloom and after the first dry stretch hardens new growth.', when: 'Skip Sep–Nov pruning' },
      { id: 'p7', text: 'Light-touch fertilizer this year — heavy feeding pushes soft growth that infects easily. Skip the spring feed for the hedge or use 1/4 strength.', when: 'Spring feed round' },
      { id: 'p8', text: 'Long-term assessment: if 1–2 hedge plants are >50% defoliated by fall, replace those individuals with resistant alternatives (Pittosporum, Viburnum, or Photinia ‘Pink Marble\' which has somewhat better tolerance) before disease wipes the row.', when: 'October review' },
    ],
  },
  {
    id: 'gardenia-mealy',
    title: 'Mealybug Infestation — Gardenia',
    plants: ['gardenia-1'],
    severity: 'active',
    summary: 'Escalation pathway: pyrethrins → insecticidal soap or horticultural oil → systemic imidacloprid. Step up only if previous step fails after 2-3 applications.',
    steps: [
      { id: 'g1', text: 'Inspect ALL leaf undersides, stem joints, and bud bases. Mealybugs are white cottony masses. Crush a sample to confirm (orange-red liquid = positive).', when: 'Today' },
      { id: 'g2', text: 'Manual reduction: dab visible colonies with cotton swab dipped in 70% isopropyl alcohol. Kills on contact and dissolves their waxy coating.', when: 'Today + repeat 2-3 days later' },
      { id: 'g3', text: 'STEP 1 SPRAY: Pyrethrin spray, drench all surfaces (top + bottom of leaves, all stem crotches). Repeat in 7 days.', when: 'After manual reduction' },
      { id: 'g4', text: 'Inspect 7 days post-pyrethrin. If still present:', when: 'Day 7' },
      { id: 'g5', text: 'STEP 2 ESCALATION: Insecticidal soap OR horticultural oil. Coat ALL surfaces. Apply early morning or evening (NOT in direct sun — soap + sun = leaf burn). Repeat 7-10 days. Two applications minimum.', when: 'If pyrethrin failed' },
      { id: 'g6', text: 'STEP 3 SYSTEMIC: Imidacloprid soil drench (Bayer Tree & Shrub Insect Control or similar). Takes 2-3 weeks to translocate. ONE application per season — do not repeat without 6+ months gap.', when: 'If soap/oil failed' },
      { id: 'g7', text: 'CULTURAL FIXES (do these alongside chemical control):', when: 'Now' },
      { id: 'g8', text: '— Improve air flow: light prune to open canopy if dense.', when: 'Now' },
      { id: 'g9', text: '— Treat sooty mold with a leaf rinse (water + drop of dish soap, wipe gently).', when: 'After mealybug reduction' },
      { id: 'g10', text: '— Watch for ants: they farm mealybugs and protect them. If ant trail is visible, apply Tanglefoot or ant bait around base. No mealybug fix sticks if ants are still active.', when: 'Now' },
      { id: 'g11', text: 'Iron chelate at next feed if leaves show yellowing between veins (mealybug stress + chlorosis often co-occur).', when: 'Next feed round' },
    ],
  },
  {
    id: 'ceanothus-watch',
    title: 'Summer Water Risk — Ceanothus ‘Skylark\'',
    plants: ['ceanothus'],
    severity: 'watch',
    summary: 'CA native that resents summer irrigation. The 5-day schedule is a long-term risk factor. ‘Skylark\' is more irrigation-tolerant than most Ceanothus but still vulnerable. No way to fully mitigate without rezoning. Watch closely; act fast if symptoms appear.',
    steps: [
      { id: 'c1', text: 'Inspect weekly through summer (Jun–Oct). Look for: sudden wilt without recovery, yellowing/browning of older leaves, leaves dropping from inner branches.', when: 'Weekly Jun–Oct' },
      { id: 'c2', text: 'NEVER fertilize. NEVER amend soil. Feeding is fatal for established Ceanothus.', when: 'Permanent rule' },
      { id: 'c3', text: 'If sudden wilt appears: STOP watering this plant immediately (turn off bubbler if possible — even cap it). Phytophthora root rot moves fast; once symptoms appear, save rate is low.', when: 'If symptoms' },
      { id: 'c4', text: 'If decline confirmed: do not replace with another Ceanothus in the same spot — soil pathogens persist. Consider Arctostaphylos (manzanita), Dendromecon, or Garrya as drought-tolerant alternatives that handle the irrigation slightly better.', when: 'If plant lost' },
      { id: 'c5', text: 'Light shaping prune after bloom (June–July) only. No summer pruning beyond that.', when: 'Post-bloom' },
    ],
  },
  {
    id: 'lavender-watch',
    title: 'Overwatering Risk — French Lavender',
    plants: ['lavandula'],
    severity: 'watch',
    summary: 'Drought-loving Mediterranean. Schedule is wetter than ideal, but ground soil + your conditions should be tolerable. Replace expectation: 5–7 year lifespan, not perpetual.',
    steps: [
      { id: 'l1', text: 'Watch for: black or soft stem at base, sudden stem die-off, mushy roots if you probe near base. These = root rot, no recovery.', when: 'Monthly check' },
      { id: 'l2', text: 'NEVER fertilize. Lean soil = better blooms + longer life.', when: 'Permanent rule' },
      { id: 'l3', text: 'Light shaping after each bloom flush. NEVER cut into bare old wood — French lavender does not resprout from old wood.', when: 'Post-bloom' },
      { id: 'l4', text: 'Plan to replace at 5-7 years. Lavender is not a long-lived shrub.', when: 'Long-term' },
    ],
  },
];

// ============================================================
// SEASONAL CALENDAR — BELMONT CA, USDA 9b / Sunset 16
// ============================================================

const MONTHLY_TASKS = {
  'January': [
    { id: 'jan-1', cat: 'prune', text: 'Japanese Maples (both): structural prune now during full dormancy. Remove crossing branches, deadwood. Stop by mid-Feb (sap rises).' },
    { id: 'jan-2', cat: 'prune', text: 'Bougainvilleas: hard prune late January if you want size control. Cut back ~1/3, more if needed.' },
    { id: 'jan-3', cat: 'spray', text: 'Flowering Plum: dormant copper spray (peach leaf curl prevention). Apply on a dry day before bud swell.' },
    { id: 'jan-4', cat: 'fertilize', text: 'NO outdoor fertilizing.' },
    { id: 'jan-5', cat: 'mulch', text: 'Top up topsoil bed mulch to maintain ~1 ft layer (carved out at bases).' },
  ],
  'February': [
    { id: 'feb-1', cat: 'prune', text: 'Camellia: light prune RIGHT after bloom finishes (cultivar-dependent). Remove spent flowers from ground (petal blight prevention).' },
    { id: 'feb-2', cat: 'spray', text: 'Flowering Plum: SECOND copper spray at bud swell.' },
    { id: 'feb-3', cat: 'prune', text: 'Last call for Japanese Maple dormant pruning — finish by mid-month.' },
    { id: 'feb-4', cat: 'fertilize', text: 'Camellia post-bloom feed: acid food + iron chelate.' },
  ],
  'March': [
    { id: 'mar-1', cat: 'fertilize', text: 'BEGIN spring feed round. Miracle-Gro all-purpose at 1/2 strength on most plants.' },
    { id: 'mar-2', cat: 'fertilize', text: 'Acid lovers (Gardenia, Azalea, Camellia, Loropetalum): Miracle-Gro + iron chelate. Ideally swap to acid food long-term.' },
    { id: 'mar-3', cat: 'fertilize', text: 'SKIP feeding: Ceanothus, Lavandula, Carpenteria, established natives. Feeding shortens their lives.' },
    { id: 'mar-4', cat: 'fertilize', text: 'Bougainvilleas: low-N feed (high P-K bloom booster) at 1/2 strength.' },
    { id: 'mar-5', cat: 'prune', text: 'Lavandula: LIGHT shape only — never into old wood.' },
    { id: 'mar-6', cat: 'pest', text: 'Watch for aphids on Plum new growth — heavy spring infestation is common.' },
  ],
  'April': [
    { id: 'apr-1', cat: 'fertilize', text: 'Continue spring feed if not done. Indoor: monthly half-strength feed begins.' },
    { id: 'apr-2', cat: 'pest', text: 'Photinia: continue Entomosporium fungicide schedule. Rake fallen leaves weekly.' },
    { id: 'apr-3', cat: 'pest', text: 'Gardenia: monitor mealybug treatment progress. Re-inspect every 7-10 days.' },
    { id: 'apr-4', cat: 'mulch', text: 'PRE-SUMMER MULCH REFRESH: top up topsoil bed to ~1 ft depth, keep cleared at plant bases (3-inch ring).' },
    { id: 'apr-5', cat: 'water', text: 'Audit each plant\'s bubbler count vs recommendations. Adjust before summer heat.' },
    { id: 'apr-6', cat: 'enjoy', text: 'Bloom watch: Carpenteria, Azalea, Ceanothus, Plum (finishing), Loropetalum, Rhododendron, late Camellia.' },
  ],
  'May': [
    { id: 'may-1', cat: 'prune', text: 'Azalea: light prune RIGHT after bloom — buds for next year set on summer growth.' },
    { id: 'may-2', cat: 'prune', text: 'Loropetalum: prune after spring bloom.' },
    { id: 'may-3', cat: 'prune', text: 'Ceanothus: very light shape AFTER bloom only. No more pruning until next spring.' },
    { id: 'may-4', cat: 'pest', text: 'Bougainvillea: watch for looper at dusk (chewed leaf edges = sign). BT spray if found.' },
    { id: 'may-5', cat: 'pest', text: 'Snail/slug bait around tender new growth (Agapanthus shoots, Hippeastrum).' },
    { id: 'may-6', cat: 'enjoy', text: 'Bloom watch: Bougainvillea ramping, Anigozanthos, Hippeastrum finishing, Salvia, Carpenteria peak, Bottlebrush.' },
  ],
  'June': [
    { id: 'jun-1', cat: 'fertilize', text: 'Mid-spring follow-up feed for heavy bloomers (Bougainvilleas, Escallonia, Loropetalum, Salvia).' },
    { id: 'jun-2', cat: 'pest', text: 'Watch ramp: aphids, mealybug, spider mites, lace bug on Azalea (silvering of upper leaf surface).' },
    { id: 'jun-3', cat: 'water', text: 'Heat wave protocol: if forecast >90°F for 3+ days, run an EXTRA cycle on day 3 (or hand-water moisture-lovers).' },
    { id: 'jun-4', cat: 'pest', text: 'Camellia: rake fallen petals to prevent petal blight buildup.' },
    { id: 'jun-5', cat: 'prune', text: 'Photinia hedge: if pruning is needed, do it NOW (after spring growth has hardened). Sanitize tools between plants.' },
  ],
  'July': [
    { id: 'jul-1', cat: 'fertilize', text: 'Bougainvilleas: another light bloom-booster feed.' },
    { id: 'jul-2', cat: 'pest', text: 'Active pest watch in heat — spider mites become severe.' },
    { id: 'jul-3', cat: 'water', text: 'Watch Carpenteria for morning droop (heat response, NOT thirst). Don\'t add water in response.' },
    { id: 'jul-4', cat: 'enjoy', text: 'Bloom watch: Bougainvillea peak, Agapanthus peak, Gardenia, Polygala, Salvia continuous.' },
  ],
  'August': [
    { id: 'aug-1', cat: 'fertilize', text: 'Light feed continues for heavy bloomers. Indoors: continue monthly.' },
    { id: 'aug-2', cat: 'pest', text: 'Ink spot watch on Anigozanthos (black streaks on leaves) — remove affected leaves.' },
    { id: 'aug-3', cat: 'enjoy', text: 'Bloom watch: Cassia ramping (peak prep), Bougainvillea sustained, Agapanthus finishing.' },
  ],
  'September': [
    { id: 'sep-1', cat: 'fertilize', text: 'LAST major feed of the year for most plants. Cut N to encourage hardening before winter.' },
    { id: 'sep-2', cat: 'water', text: 'Begin tapering — but stick to schedule until rains start (typically late Oct/Nov here).' },
    { id: 'sep-3', cat: 'enjoy', text: 'Bloom watch: Cassia PEAK (late month), Bougainvillea sustained, Salvia, Polygala.' },
  ],
  'October': [
    { id: 'oct-1', cat: 'fertilize', text: 'STOP fertilizing outdoors. Indoor: last feed of the year.' },
    { id: 'oct-2', cat: 'pest', text: 'Photinia treatment review: assess hedge condition. Identify any individuals >50% defoliated for replacement.' },
    { id: 'oct-3', cat: 'prune', text: 'NO PHOTINIA PRUNING. Avoid all hedge fall pruning — soft growth = winter disease.' },
    { id: 'oct-4', cat: 'enjoy', text: 'Cassia in full glory. Bougainvillea last hurrah.' },
  ],
  'November': [
    { id: 'nov-1', cat: 'mulch', text: 'Mulch refresh before winter rains.' },
    { id: 'nov-2', cat: 'water', text: 'When rains begin: turn off irrigation system or significantly reduce. Save water + reduce root rot risk.' },
    { id: 'nov-3', cat: 'fertilize', text: 'NO outdoor fertilizing.' },
  ],
  'December': [
    { id: 'dec-1', cat: 'prune', text: 'Japanese Maples: BEGIN dormant prune (after leaf drop). Prime window Dec–Jan.' },
    { id: 'dec-2', cat: 'spray', text: 'Flowering Plum: FIRST dormant copper spray (peach leaf curl prevention).' },
    { id: 'dec-3', cat: 'prune', text: 'Bougainvillea: hard prune option late month if size control needed.' },
    { id: 'dec-4', cat: 'fertilize', text: 'NO fertilizing.' },
  ],
};

// ============================================================
// HELPERS
// ============================================================

const LOC_LABEL = {
  'backyard-topsoil': 'Backyard — Topsoil',
  'backyard-ground': 'Backyard — Ground',
  'frontyard-ground': 'Frontyard — Ground',
  'indoor': 'Indoor',
};

const LOC_ICON = {
  'backyard-topsoil': Sprout,
  'backyard-ground': TreePine,
  'frontyard-ground': TreePine,
  'indoor': Home,
};

const SIZE_LABEL = {
  '5-10gal': '5–10 gal',
  '15-20gal': '15–20 gal',
  'small-tree': 'Small tree',
  'big-tree': 'Big tree',
  'pot': 'Potted',
};

const MATCH_STYLES = {
  good: { bg: 'bg-emerald-50', text: 'text-emerald-900', border: 'border-emerald-200', dot: 'bg-emerald-600', label: 'Good match' },
  watch: { bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-200', dot: 'bg-amber-600', label: 'Watch' },
  risk: { bg: 'bg-rose-50', text: 'text-rose-900', border: 'border-rose-200', dot: 'bg-rose-600', label: 'At risk' },
};

function getWaterSource(plant) {
  if (plant.waterSource) return plant.waterSource;
  if (plant.loc === 'indoor') return 'hand';
  return 'bubbler';
}

const SOURCE_LABEL = {
  bubbler: 'Bubbler',
  sprinkler: 'Lawn sprinkler',
  natural: 'Self-sustaining',
  hand: 'Hand-watered',
};

const SOURCE_DESC = {
  bubbler: 'Rain Bird inline bubbler · 10 min every 5 days',
  sprinkler: 'Lawn sprinkler · 10 min every 5 days · soil dries in 4-5 days',
  natural: 'No irrigation · deep roots / water table',
  hand: 'Hand-watered as needed',
};

const FLOW_LABEL = {
  off: 'Off',
  low: 'Low',
  med: 'Medium',
  high: 'High',
};

const FLOW_GPH = { off: 0, low: 3, med: 7, high: 13 };

const FLOW_DESC = {
  off: 'Off (~0 GPH)',
  low: 'Low (~3 GPH · 0.5 gal/cycle)',
  med: 'Medium (~7 GPH · 1.2 gal/cycle)',
  high: 'High (~13 GPH · 2.2 gal/cycle)',
};

const FLOW_STYLES = {
  off: 'bg-stone-200 text-stone-700',
  low: 'bg-sky-100 text-sky-900',
  med: 'bg-emerald-100 text-emerald-900',
  high: 'bg-amber-100 text-amber-900',
};

function flowGalPerCycle(flow, bubblers, runtimeMin = 10) {
  return ((FLOW_GPH[flow] || 0) * bubblers * runtimeMin) / 60;
}

function flowGalPerWeek(flow, bubblers, runtimeMin, intervalDays) {
  const cyclesPerWeek = 7 / Math.max(0.5, intervalDays);
  return flowGalPerCycle(flow, bubblers, runtimeMin) * cyclesPerWeek;
}

// Monthly ETo multiplier for Belmont CA (CIMIS Zone 3, coastal plains)
// Calibrated to summer peak (June) = 1.0; values from CIMIS historical monthly ETo.
// Plant water need scales linearly with ETo, so these multiply needMin/needMax.
const ETO_FACTOR_BY_MONTH = {
  0: 0.25,  // Jan
  1: 0.35,  // Feb
  2: 0.60,  // Mar
  3: 0.79,  // Apr
  4: 0.95,  // May
  5: 1.00,  // Jun (peak)
  6: 0.98,  // Jul
  7: 0.88,  // Aug
  8: 0.68,  // Sep
  9: 0.49,  // Oct
  10: 0.30, // Nov
  11: 0.21, // Dec
};

const SEASON_PRESETS = {
  auto:   { label: 'Auto (current month)', factor: null }, // factor null = use current month
  winter: { label: 'Winter (Jan)',  factor: 0.25 },
  spring: { label: 'Spring (Apr)',  factor: 0.79 },
  summer: { label: 'Summer (Jun)',  factor: 1.00 },
  fall:   { label: 'Fall (Oct)',    factor: 0.49 },
};

// Lawn watering data — measurements + planning
// Catch can: 4 containers, 13cm × 13cm opening (= 169 cm² = 26.19 sq inches), 7-min cycle
// Conversion: fl oz × 1.8047 = cubic inches; depth (in) = cubic inches / 26.19
const LAWN_CONTAINER_AREA_SQIN = 26.19;
const LAWN_TARGET_INCHES_PER_WEEK = 0.75; // June effective need at 3" mowing, ~Kc 0.75

const LAWN_DATA = {
  system: {
    grass: 'Fescue + bluegrass (90/10)',
    mowingHeight: '3 in',
    wateringTime: 'Night',
    pressureBaseline: 55,
    pressureUnderLoad: 42,
    cycleTimeFinding: '6 min (was 7 — visible runoff)',
    soakTime: '30+ min OK',
    seasonNeed: '0.75 in/wk effective (June, Belmont coastal)',
    rainContext: 'Wet season normal (Oct 2025–May 2026: ~19.7 in at SFO, 101% of normal). May 2026 was dry; lawn now on irrigation only.',
  },
  zones: [
    {
      id: 'backyard',
      label: 'Backyard',
      area: 1000,
      readings: [1.7, 1.9, 2.3, 3.3],     // fl oz per 7-min cycle, catch can
      moenFloGross7min: 170,               // gallons consumed per 7-min cycle (Moen Flo)
      currentSchedule: { cycles: 2, mins: 7, intervalDays: 5 },
      recommendedSchedule: { cycles: 3, mins: 6, intervalDays: 5 },
      notes: [
        'Visible runoff begins ~30 min after 7-min cycles. Water exits via French drains + sump pump to road.',
        'DU acceptable (~74%); volume + cycle time are the issues, not uniformity.',
        '3 × 6-min eliminates runoff at roughly same total water as 2 × 7-min.',
      ],
      status: 'fixable',
    },
    {
      id: 'fy-middle',
      label: 'Frontyard middle',
      area: 250,
      readings: [2.8, 3.7, 4.2, 5.6],
      moenFloGross7min: 63,
      currentSchedule: { cycles: 2, mins: 7, intervalDays: 5 },
      recommendedSchedule: { cycles: 3, mins: 6, intervalDays: 5 },
      notes: [
        'Soil probe-tested: dries by day 5 at 6-12" depth. 5-day interval confirmed correct.',
        'Yellow patches correspond to low-coverage cans (DU 69% — borderline).',
        'Adding a 3rd cycle at 6 min brings dry spots up; some over-watering at lush spots is the cost of DU compensation.',
      ],
      status: 'fixable',
    },
    {
      id: 'fy-side',
      label: 'Frontyard side',
      area: 250,
      readings: [0.6, 1.0, 1.4, 2.3],
      moenFloGross7min: 63,
      currentSchedule: { cycles: 2, mins: 7, intervalDays: 5 },
      recommendedSchedule: { cycles: 2, mins: 6, intervalDays: 5 },
      notes: [
        '22% catch-can efficiency BUT lawn is growing fine. Indirect water reaches grass via curbing rebound, slope distribution, and clay storage — none captured by upright cans.',
        'DU poor (~45%) but unfixable: layout is irregular + min head spacing prevents adding heads.',
        "Don't chase the math; trust the lawn. Keep close to current.",
      ],
      status: 'structural-limit',
    },
  ],
};

function computeLawnZone(zone) {
  const depths7 = zone.readings.map(oz => (oz * 1.8047) / LAWN_CONTAINER_AREA_SQIN);
  const avgDepth7 = depths7.reduce((a, b) => a + b, 0) / depths7.length;
  const maxDepth7 = Math.max(...depths7);
  const minDepth7 = Math.min(...depths7);
  // Distribution Uniformity (Low Quarter method); with 4 cans, low quarter = lowest 1
  const du = (minDepth7 / avgDepth7) * 100;
  // Effective gallons delivered to lawn surface per 7-min cycle
  const avgGalAt7 = avgDepth7 * zone.area * 0.623;
  const efficiency = (avgGalAt7 / zone.moenFloGross7min) * 100;
  // At 6-min cycles
  const avgDepth6 = avgDepth7 * 6 / 7;
  const maxDepth6 = maxDepth7 * 6 / 7;
  const avgGalAt6 = avgGalAt7 * 6 / 7;
  const moenFlo6 = zone.moenFloGross7min * 6 / 7;
  // Current weekly delivery (uses 7-min readings since current is 7-min cycles)
  const cs = zone.currentSchedule;
  const currentDepthPerSession = avgDepth7 * cs.cycles;
  const currentSessionsPerWeek = 7 / cs.intervalDays;
  const currentWeeklyAvg = currentDepthPerSession * currentSessionsPerWeek;
  const currentWeeklyAvgGal = currentWeeklyAvg * zone.area * 0.623;
  // Recommended weekly delivery (uses 6-min depths if 6-min scheduled, 7-min if 7-min)
  const rs = zone.recommendedSchedule;
  const recDepthPerCycle = rs.mins === 6 ? avgDepth6 : avgDepth7;
  const recMaxDepthPerCycle = rs.mins === 6 ? maxDepth6 : maxDepth7;
  const recSessionsPerWeek = 7 / rs.intervalDays;
  const recWeeklyAvg = recDepthPerCycle * rs.cycles * recSessionsPerWeek;
  const recWeeklyMax = recMaxDepthPerCycle * rs.cycles * recSessionsPerWeek;
  const recWeeklyAvgGal = recWeeklyAvg * zone.area * 0.623;
  return {
    ...zone,
    depths7,
    avgDepth7, maxDepth7, minDepth7,
    avgDepth6, maxDepth6,
    avgGalAt7, avgGalAt6,
    moenFlo6,
    efficiency, du,
    currentWeeklyAvg, currentWeeklyAvgGal,
    recWeeklyAvg, recWeeklyMax, recWeeklyAvgGal,
    target: LAWN_TARGET_INCHES_PER_WEEK,
    avgVsTarget: (recWeeklyAvg / LAWN_TARGET_INCHES_PER_WEEK) * 100,
    maxVsTarget: (recWeeklyMax / LAWN_TARGET_INCHES_PER_WEEK) * 100,
  };
}

// Planter (bubbler-watered) zone data — measurements + planning
// Moen Flo measures whole-zone consumption per cycle; efficiency accounts for losses
// (deep percolation in fast-draining soil, lateral spread, surface evap).
// CRITICAL: only key the recommended TOTAL MINUTES + INTERVAL into Rachio.
// Effective need (gal/wk) is for analysis only — do NOT enter it as Rachio input.
const PLANTER_DATA = {
  zones: [
    {
      id: 'backyard-planter',
      label: 'Backyard planter bed',
      soilType: 'Topsoil + clay mix',
      drainage: 'Fast-draining',
      mulch: 'Shredded mulch · 4" bare around stems',
      grossPerCycle: 28,             // Moen Flo: gal per 4-min cycle
      cycleMins: 4,
      currentRachioInput: { totalMins: 27, intervalDays: 4 },
      recommendedRachio: { totalMins: 16, intervalDays: 3, cycles: 4, cycleMins: 4 },
      effectiveNeed: 100,            // gal/wk (calc'd from plant species needs)
      efficiency: 55,                // %, midpoint of 45-65% range
      efficiencyRange: '45-65%',
      notes: [
        'Fast-draining soil: 25-40% loss to deep percolation past root zone is the main inefficiency.',
        'Shredded mulch (in place) reduces surface evap to ~3-5%.',
        'Bubblers correctly placed (e.g., Gardenia: 2 at MED, diametrically opposite, 6" from stem).',
        'Shorter cycles + more frequent intervals keep root zone consistently moist vs current cycle of wet → dust over 4 days.',
        'After switching, probe-test root zone (4-8" deep) 2 days after watering: should feel moist, not bone-dry.',
      ],
    },
    {
      id: 'frontyard-planter',
      label: 'Frontyard planter bed',
      soilType: 'Clay',
      drainage: 'Slow-draining (good moisture retention)',
      mulch: 'Wood bark chips · 4" bare around stems',
      grossPerCycle: 23,             // Moen Flo: gal per 4-min cycle
      cycleMins: 4,
      currentRachioInput: { totalMins: 27, intervalDays: 5 },
      recommendedRachio: { totalMins: 16, intervalDays: 5, cycles: 4, cycleMins: 4 },
      effectiveNeed: 80,
      efficiency: 78,                // %, midpoint of 70-85% range
      efficiencyRange: '70-85%',
      notes: [
        'Clay holds water well: minimal deep percolation; main loss is lateral concentration around point-source bubblers (8-15%).',
        'Wood bark chips reduce surface evap to ~3-5%.',
        '5-day interval works because clay releases water slowly to roots over multi-day periods.',
        "Don't shorten interval — clay's storage capacity is the buffer.",
      ],
    },
  ],
};

function computePlanterZone(zone) {
  const cur = zone.currentRachioInput;
  const rec = zone.recommendedRachio;

  // Current: total min / cycleMins = cycles per session
  const currentCyclesPerSession = cur.totalMins / zone.cycleMins;
  const currentGrossPerSession = currentCyclesPerSession * zone.grossPerCycle;
  const currentGrossPerWeek = currentGrossPerSession * (7 / cur.intervalDays);
  const currentEffectivePerWeek = currentGrossPerWeek * (zone.efficiency / 100);

  // Recommended
  const recGrossPerSession = rec.cycles * zone.grossPerCycle;
  const recGrossPerWeek = recGrossPerSession * (7 / rec.intervalDays);
  const recEffectivePerWeek = recGrossPerWeek * (zone.efficiency / 100);

  // Effective need range (low/high efficiency bounds)
  const effLow = parseInt(zone.efficiencyRange.split('-')[0]) / 100;
  const effHigh = parseInt(zone.efficiencyRange.split('-')[1]) / 100;
  const recEffLow = recGrossPerWeek * effLow;
  const recEffHigh = recGrossPerWeek * effHigh;

  return {
    ...zone,
    currentCyclesPerSession,
    currentGrossPerSession,
    currentGrossPerWeek,
    currentEffectivePerWeek,
    currentVsNeed: (currentEffectivePerWeek / zone.effectiveNeed) * 100,
    recGrossPerSession,
    recGrossPerWeek,
    recEffectivePerWeek,
    recEffLow,
    recEffHigh,
    recVsNeed: (recEffectivePerWeek / zone.effectiveNeed) * 100,
    recVsNeedLow: (recEffLow / zone.effectiveNeed) * 100,
    recVsNeedHigh: (recEffHigh / zone.effectiveNeed) * 100,
    waterSavedGalPerWeek: currentGrossPerWeek - recGrossPerWeek,
    waterSavedPercent: ((currentGrossPerWeek - recGrossPerWeek) / currentGrossPerWeek) * 100,
  };
}

// Veggie raised beds — single drip zone across all 5 beds
// Flow rate measured via Rachio: 14 gal / 3 min = 4.67 GPM
// Monthly need (effective inches/wk) for mixed veggies, coastal CA
const VEGGIE_DATA = {
  config: {
    bedCount: 5,
    bedLength: 8,    // ft
    bedWidth: 2,     // ft
    activePercent: 75,
    flowRateGPM: 14 / 3, // = 4.67 GPM (14 gal / 3 min, per Rachio)
    efficiency: 80,      // %, mid-range for drip in raised beds with mulch
    efficiencyRange: '70-85%',
    defaultSessionsPerWeek: 3, // every 2-3 days
  },
  // Effective inches/week need by month for mixed veggie raised beds
  // (heavier than ornamentals due to high transpiration + shallow roots)
  monthlyNeedInches: {
    0: 0.20,  // Jan — rain usually covers
    1: 0.30,  // Feb
    2: 0.60,  // Mar
    3: 0.85,  // Apr
    4: 1.00,  // May
    5: 1.40,  // Jun
    6: 1.55,  // Jul (peak)
    7: 1.60,  // Aug
    8: 1.10,  // Sep
    9: 0.70,  // Oct
    10: 0.35, // Nov
    11: 0.20, // Dec — rain usually covers
  },
};

function computeVeggieZone(monthIndex, sessionsPerWeek) {
  const c = VEGGIE_DATA.config;
  const sessions = sessionsPerWeek || c.defaultSessionsPerWeek;
  const activeArea = c.bedCount * c.bedLength * c.bedWidth * (c.activePercent / 100);
  const needPerWeekIn = VEGGIE_DATA.monthlyNeedInches[monthIndex];
  const effectiveGalPerWeek = activeArea * needPerWeekIn * 0.623;
  const grossGalPerWeek = effectiveGalPerWeek / (c.efficiency / 100);
  const grossGalPerSession = grossGalPerWeek / sessions;
  const minutesPerSession = grossGalPerSession / c.flowRateGPM;
  return {
    activeArea,
    needPerWeekIn,
    effectiveGalPerWeek,
    grossGalPerWeek,
    grossGalPerSession,
    minutesPerSession,
    sessionsPerWeek: sessions,
  };
}

function getSeasonalFactor(seasonView) {
  if (seasonView === 'auto') {
    const month = new Date().getMonth();
    return ETO_FACTOR_BY_MONTH[month];
  }
  return SEASON_PRESETS[seasonView]?.factor ?? 1.0;
}

function getSeasonalLabel(seasonView) {
  if (seasonView === 'auto') {
    const month = new Date().getMonth();
    const monthName = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][month];
    return `Auto · ${monthName}`;
  }
  return SEASON_PRESETS[seasonView]?.label ?? '';
}

const DEFAULT_SCHEDULES = {
  backyard: { runtime: 15, interval: 5 },
  frontyard: { runtime: 15, interval: 5 },
};

// Physical max runtime per zone (drainage limit; null = no cap)
const MAX_RUNTIME = {
  backyard: 15,    // water drains out beyond 15 min
  frontyard: null, // no known cap
};

function getPlantScheduleKey(plant) {
  if (getWaterSource(plant) !== 'bubbler') return null;
  return plant.loc && plant.loc.startsWith('backyard') ? 'backyard' : 'frontyard';
}

const FEED_GROUPS = {
  acid: {
    label: 'Acid lovers',
    color: 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-900',
    accent: 'bg-fuchsia-700',
    desc: 'Want pH 5.0–6.5. Your soil tested 6.5 — at the upper edge but tolerable. Standard MG works at this pH; iron chelate not needed unless chlorosis (yellow-between-veins) appears.',
    haveProducts: 'Miracle-Gro all-purpose 1/2 strength — same recipe as standard ornamentals at your current pH.',
    upgradeProducts: 'Espoma Holly-Tone (granular slow-release) only if you ever observe chlorosis. Apply 2x/yr.',
    schedule: 'March + September (same as standard ornamentals).',
  },
  bloomer: {
    label: 'Heavy bloomers (low N, high P-K)',
    color: 'bg-rose-50 border-rose-200 text-rose-900',
    accent: 'bg-rose-700',
    desc: 'High nitrogen pushes leaf growth at the expense of flowers. Want bloom-booster formulas.',
    haveProducts: 'Miracle-Gro all-purpose at 1/4 strength (cuts the N excess somewhat).',
    upgradeProducts: 'Schultz Bloom Plus (10-54-10) or any low-N high-P-K liquid. Or Espoma Bloom! granular.',
    schedule: 'March + June + August (3 light feeds during bloom season).',
  },
  standard: {
    label: 'Standard ornamentals',
    color: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    accent: 'bg-emerald-700',
    desc: 'Balanced feeders. Half-strength MG works fine.',
    haveProducts: 'Miracle-Gro all-purpose at 1/2 strength.',
    upgradeProducts: 'Optional: Osmocote slow-release for set-and-forget convenience.',
    schedule: 'March (spring) + June (mid-summer) — 2 feeds per year.',
  },
  tree: {
    label: 'Trees',
    color: 'bg-amber-50 border-amber-200 text-amber-900',
    accent: 'bg-amber-700',
    desc: 'Three new trees in distinct establishment phases as of Apr 2026. Mature self-sustaining trees (Bottlebrush, Cabbage Tree) need nothing.',
    haveProducts: 'Cassia × 2 + Tristaniopsis × 1 (replanted ~Feb 2026, new growth confirmed): bone meal Batch 4 only. Plum × 2 (planted Apr 2026, 2-4 weeks): skip everything — too fresh.',
    upgradeProducts: 'When ready (year 2+): include in Batch 1 (MG 1/2). Bone meal can be repeated once per spring during establishment years.',
    schedule: 'Cassia + Tristaniopsis: bone meal NOW (Batch 4). Plum: first feed April 2027. Reassess Plum mid-June for light bone meal if vigorous.',
  },
  none: {
    label: 'DO NOT feed',
    color: 'bg-stone-100 border-stone-300 text-stone-800',
    accent: 'bg-stone-700',
    desc: 'CA natives, Mediterranean drought-lovers, succulents, mature self-sustaining trees. Feeding shortens lifespan or causes leggy growth.',
    haveProducts: 'Nothing. Compost mulch only if soil is depleted.',
    upgradeProducts: 'N/A.',
    schedule: 'Never.',
  },
  indoor: {
    label: 'Indoor plants',
    color: 'bg-sky-50 border-sky-200 text-sky-900',
    accent: 'bg-sky-700',
    desc: 'Half-strength balanced food monthly during active growth; nothing in winter.',
    haveProducts: 'Miracle-Gro all-purpose at 1/2 strength, monthly. Quarter-strength for Peperomia (light feeder).',
    upgradeProducts: 'Optional: liquid kelp / fish emulsion for a gentler organic option (no chlorine concern for fluoride-sensitive plants like Dracaena, Ti, Peace Lily).',
    schedule: 'Monthly Mar–Oct. Skip Nov–Feb.',
  },
};

const FEED_GROUP_BY_PLANT = {
  // Acid lovers
  'gardenia-1': 'acid', 'azalea': 'acid', 'camellia': 'acid', 'loropetalum': 'acid',
  'maple-back': 'acid', 'maple-front': 'acid', 'photinia': 'acid', 'leptospermum': 'acid',
  // Heavy bloomers
  'boug-purple': 'bloomer', 'boug-orange': 'bloomer', 'boug-white': 'bloomer',
  // Trees
  'cassia': 'tree', 'plum': 'tree', 'tristaniopsis': 'tree',
  'bottlebrush': 'none', 'cordyline-aus': 'none',
  // Do not feed (CA natives, Mediterranean drought-lovers, succulents)
  'ceanothus': 'none', 'lavandula': 'none', 'carpenteria': 'none',
  'anigozanthos': 'none', 'polygala': 'none', 'mesem': 'none',
};

function getFeedGroup(plant) {
  if (FEED_GROUP_BY_PLANT[plant.id]) return FEED_GROUP_BY_PLANT[plant.id];
  if (plant.loc === 'indoor') return 'indoor';
  return 'standard';
}

function getQty(plant) {
  return plant.qty || 1;
}

// Plants planted 2-4 weeks ago (as of Apr 2026) — skip all feeding this spring
// Earliest reassessment: mid-June 2026 for light bone meal if vigorous growth
// Default first MG feed: April 2027 (12 months after planting)
// Note: 6 of 10 mirror plants are newly planted; we skip ALL 10 for gardener simplicity
//       (the 4 older mirror plants will be fine missing one feed)
const NEWLY_PLANTED_PLANTS = [
  'plum',          // Plum × 2 (planted ~Apr 2026, 2-4 weeks)
  'leptospermum',  // Manuka × 1 (planted ~Apr 2026, 2-4 weeks)
  'euonymus',      // Japanese Spindle × 4 (all planted ~Apr 2026)
  'cop-evening',   // Mirror Plant Evening × 5 (some new, skip all for simplicity)
  'cop-rainbow',   // Mirror Plant Rainbow × 5 (some new, skip all for simplicity)
];

// Plants replanted ~2 months ago, showing active new growth — get bone meal only this spring
// (light P-bias feed supports root regeneration; no MG needed)
const BONE_MEAL_PLANTS = [
  'cassia',         // Cassia × 2 (replanted ~Feb 2026 on mound, new growth Apr 2026)
  'tristaniopsis',  // Tristaniopsis × 1 (replanted ~Feb 2026 on mound, new growth Apr 2026)
];

// Per-plant solution volume (in gallons) by size class for liquid drenches
const SOLUTION_VOL_BY_SIZE = {
  '5-10gal': 0.094,    // 1.5 cups (avg of 1-2)
  '15-20gal': 0.156,   // 2.5 cups (avg of 2-3)
  'small-tree': 1.5,   // 1-2 gal
  'big-tree': 4,       // ~4 gal for big tree dripline
  'pot': 0.4,          // ~0.4 gal drench-and-drain per pot
};

// For Holly-Tone: per-plant dry granular volume in cups
const HOLLY_TONE_BY_SIZE = {
  '5-10gal': 0.333,    // 1/3 cup
  '15-20gal': 0.667,   // 2/3 cup
  'small-tree': 1.5,
  'big-tree': 3.0,
};

// For Osmocote Plus 15-9-12 (slow-release granular, lasts ~6 months): per-plant dry volume in cups
// Conservative landscape rates — better to under-feed than over-feed
const OSMOCOTE_BY_SIZE = {
  '5-10gal': 0.125,    // 2 tbsp
  '15-20gal': 0.25,    // 4 tbsp
  'small-tree': 0.5,   // 8 tbsp (1/2 cup)
  'big-tree': 0,       // mature trees self-sustaining, skip
  'pot': 0.0625,       // 1 tbsp per 8" pot
};

// For elemental sulfur: per-plant dry volume in cups
const SULFUR_BY_SIZE = {
  '5-10gal': 0.5,
  '15-20gal': 1.0,
  'small-tree': 2.0,
  'big-tree': 4.0,
};

// For iron chelate soil drench: per-plant solution volume in gallons
// Rates calibrated for actual nursery sizes — small tree = 15-gal, not mature
const IRON_DRENCH_BY_SIZE = {
  '5-10gal': 1,
  '15-20gal': 1.5,
  'small-tree': 2,
  'big-tree': 4,
  'pot': 0.4,
};

function getSkipList(plants, schedule) {
  // Returns array of { name, qty, reason } for plants intentionally excluded from this schedule
  if (schedule === 'mg-half') {
    const skip = [];
    plants.forEach(p => {
      const isNew = NEWLY_PLANTED_PLANTS.includes(p.id);
      const isBoneMeal = BONE_MEAL_PLANTS.includes(p.id);
      const fg = getFeedGroup(p);

      if (isNew) {
        skip.push({ id: p.id, name: p.common, qty: getQty(p), reason: 'newly-planted-2-4wk' });
      } else if (isBoneMeal) {
        skip.push({ id: p.id, name: p.common, qty: getQty(p), reason: 'bone-meal-batch' });
      } else if (fg === 'none') {
        skip.push({ id: p.id, name: p.common, qty: getQty(p), reason: 'drought/native' });
      } else if (fg === 'bloomer') {
        skip.push({ id: p.id, name: p.common, qty: getQty(p), reason: 'separate batch (1/4 strength)' });
      } else if (p.loc === 'indoor') {
        skip.push({ id: p.id, name: p.common, qty: getQty(p), reason: 'indoor batch' });
      }
    });
    return skip;
  }
  return [];
}

function calculateDosing(plants, schedule) {
  // schedule = 'mg-half', 'mg-quarter', 'iron-drench', 'bloom', 'holly', 'sulfur', 'indoor-half'
  const result = {
    plantList: [],
    totalGallons: 0,
    totalCups: 0,
    totalProductTsp: 0,
    totalProductTbsp: 0,
  };

  if (schedule === 'mg-half') {
    // Standard ornamentals + acid lovers (at pH 6.5, both get same MG 1/2 treatment)
    // Exclude newly-planted (skip first growing season) and bone-meal-batch plants
    const matching = plants.filter(p => {
      if (NEWLY_PLANTED_PLANTS.includes(p.id)) return false;
      if (BONE_MEAL_PLANTS.includes(p.id)) return false;
      const fg = getFeedGroup(p);
      return fg === 'standard' || fg === 'acid';
    });
    matching.forEach(p => {
      const q = getQty(p);
      const perPlantVol = SOLUTION_VOL_BY_SIZE[p.size] || 0.094;
      const volGal = perPlantVol * q;
      result.plantList.push({ id: p.id, name: p.common, size: p.size, qty: q, perPlantVol, volGal });
      result.totalGallons += volGal;
    });
    result.totalProductTsp = result.totalGallons * 1.5;
  } else if (schedule === 'bone-meal') {
    // Bone meal for 2-month replants showing new growth (Cassia + Tristaniopsis)
    const matching = plants.filter(p => BONE_MEAL_PLANTS.includes(p.id));
    matching.forEach(p => {
      const q = getQty(p);
      const perPlantVol = 0.5; // 1/2 cup per tree, regardless of size (mound application)
      const volCups = perPlantVol * q;
      result.plantList.push({ id: p.id, name: p.common, size: p.size, qty: q, perPlantVol, volCups });
      result.totalCups += volCups;
    });
  } else if (schedule === 'osmocote') {
    // Osmocote 15-9-12 slow-release granular for outdoor: standard + acid lovers
    // Excludes newly-planted, bone-meal, drought natives, big trees
    const matching = plants.filter(p => {
      if (NEWLY_PLANTED_PLANTS.includes(p.id)) return false;
      if (BONE_MEAL_PLANTS.includes(p.id)) return false;
      if (p.loc === 'indoor') return false;
      const fg = getFeedGroup(p);
      return fg === 'standard' || fg === 'acid' || fg === 'bloomer';
    });
    matching.forEach(p => {
      const q = getQty(p);
      // Bougainvilleas (bloomer) get HALF the size-based rate to keep N moderate
      const isBloomer = getFeedGroup(p) === 'bloomer';
      const baseRate = OSMOCOTE_BY_SIZE[p.size] || 0;
      const perPlantVol = isBloomer ? baseRate * 0.5 : baseRate;
      const volCups = perPlantVol * q;
      if (perPlantVol > 0) {
        result.plantList.push({ id: p.id, name: p.common, size: p.size, qty: q, perPlantVol, volCups });
        result.totalCups += volCups;
      }
    });
  } else if (schedule === 'osmocote-indoor') {
    // Osmocote for houseplants
    const matching = plants.filter(p => p.loc === 'indoor');
    matching.forEach(p => {
      const q = getQty(p);
      const perPlantVol = OSMOCOTE_BY_SIZE['pot'];
      const volCups = perPlantVol * q;
      result.plantList.push({ id: p.id, name: p.common, size: p.size, qty: q, perPlantVol, volCups });
      result.totalCups += volCups;
    });
  } else if (schedule === 'mg-quarter') {
    const matching = plants.filter(p => getFeedGroup(p) === 'bloomer');
    matching.forEach(p => {
      const q = getQty(p);
      const perPlantVol = SOLUTION_VOL_BY_SIZE[p.size] || 0.094;
      const volGal = perPlantVol * q;
      result.plantList.push({ id: p.id, name: p.common, size: p.size, qty: q, perPlantVol, volGal });
      result.totalGallons += volGal;
    });
    result.totalProductTsp = result.totalGallons * 0.75;
  } else if (schedule === 'iron-drench') {
    const matching = plants.filter(p => {
      const fg = getFeedGroup(p);
      return fg === 'acid' || p.id === 'bottlebrush' || p.id === 'cassia';
    });
    matching.forEach(p => {
      const q = getQty(p);
      const perPlantVol = IRON_DRENCH_BY_SIZE[p.size] || 1;
      const volGal = perPlantVol * q;
      result.plantList.push({ id: p.id, name: p.common, size: p.size, qty: q, perPlantVol, volGal });
      result.totalGallons += volGal;
    });
    result.totalProductTsp = result.totalGallons * 1;
  } else if (schedule === 'bloom') {
    const matching = plants.filter(p => getFeedGroup(p) === 'bloomer');
    matching.forEach(p => {
      const q = getQty(p);
      const perPlantVol = SOLUTION_VOL_BY_SIZE[p.size] || 0.094;
      const volGal = perPlantVol * q;
      result.plantList.push({ id: p.id, name: p.common, size: p.size, qty: q, perPlantVol, volGal });
      result.totalGallons += volGal;
    });
    result.totalProductTsp = result.totalGallons * 1;
  } else if (schedule === 'holly') {
    const matching = plants.filter(p => getFeedGroup(p) === 'acid');
    matching.forEach(p => {
      const q = getQty(p);
      const perPlantVol = HOLLY_TONE_BY_SIZE[p.size] || 0.333;
      const volCups = perPlantVol * q;
      result.plantList.push({ id: p.id, name: p.common, size: p.size, qty: q, perPlantVol, volCups });
      result.totalCups += volCups;
    });
  } else if (schedule === 'sulfur') {
    const matching = plants.filter(p => getFeedGroup(p) === 'acid');
    matching.forEach(p => {
      const q = getQty(p);
      const perPlantVol = SULFUR_BY_SIZE[p.size] || 0.5;
      const volCups = perPlantVol * q;
      result.plantList.push({ id: p.id, name: p.common, size: p.size, qty: q, perPlantVol, volCups });
      result.totalCups += volCups;
    });
  } else if (schedule === 'indoor-half') {
    const matching = plants.filter(p => p.loc === 'indoor');
    matching.forEach(p => {
      const q = getQty(p);
      const perPlantVol = SOLUTION_VOL_BY_SIZE['pot'];
      const volGal = perPlantVol * q;
      result.plantList.push({ id: p.id, name: p.common, size: p.size, qty: q, perPlantVol, volGal });
      result.totalGallons += volGal;
    });
    result.totalProductTsp = result.totalGallons * 1.5;
  }

  result.totalProductTbsp = result.totalProductTsp / 3;
  result.plantCount = result.plantList.reduce((sum, p) => sum + (p.qty || 1), 0);

  result.totalGallonsPractical = Math.ceil(result.totalGallons * 2) / 2;
  result.totalCupsPractical = Math.ceil(result.totalCups * 2) / 2;

  return result;
}

const SOIL_ZONES = [
  { id: 'bk-topsoil', label: 'Backyard topsoil bed', desc: 'Behind 2-ft bench wall. 1 ft loose dirt + 1 ft topsoil. Drains in 2-3 days.', plantNames: 'Coprosmas, Gardenia, Bougainvilleas, Azalea, Ceanothus, Anigozanthos, Salvia, Escallonia, Agapanthus, backyard Maple, Polygala, Eupatorium, Privets, Loropetalum, Iceplant, Euonymus' },
  { id: 'bk-ground', label: 'Backyard ground', desc: 'Few inches topsoil over native. Surprisingly fast drainage — dry at 6-12" depth within 12 hrs of watering.', plantNames: 'Carpenteria, Phormium, Hippeastrum (irrigated). Bottlebrush, Cabbage Tree (self-sustaining)' },
  { id: 'fy-moisture', label: 'Frontyard — moisture zone', desc: 'Thin topsoil over Belmont native clay. Around Camellia + frontyard Maple area.', plantNames: 'Camellia, frontyard Maple, Wax Leaf Privet' },
  { id: 'fy-drought', label: 'Frontyard — drought zone', desc: 'Thin topsoil over clay. Around Lavandula + Manuka.', plantNames: 'Lavandula, Leptospermum, Eupatorium' },
  { id: 'fy-photinia', label: 'Frontyard — Photinia hedge', desc: 'Slightly thicker topsoil over clay. The 9-plant hedge with active Entomosporium treatment.', plantNames: 'Photinia × fraseri ×9' },
  { id: 'fy-lawn', label: 'Frontyard lawn (new trees)', desc: 'Lawn area with sprinklers. New small trees.', plantNames: 'Cassia, Plum, Tristaniopsis' },
];

const NPK_LEVELS = [
  { id: 'depleted', label: 'Depleted', color: 'bg-rose-100 text-rose-900' },
  { id: 'deficient', label: 'Deficient', color: 'bg-amber-100 text-amber-900' },
  { id: 'adequate', label: 'Adequate', color: 'bg-emerald-100 text-emerald-900' },
  { id: 'sufficient', label: 'Sufficient', color: 'bg-emerald-100 text-emerald-900' },
  { id: 'surplus', label: 'Surplus', color: 'bg-sky-100 text-sky-900' },
];

function interpretPh(ph) {
  if (ph >= 8.0) return { tone: 'rose', short: 'Strongly alkaline', long: 'Most plants struggle. Acid-lovers will be severely chlorotic. Apply FeEDDHA iron chelate AND start sulfur amendment program. Consider raised beds with imported soil for sensitive species.' };
  if (ph >= 7.5) return { tone: 'rose', short: 'Alkaline', long: 'Acid-lovers (Gardenia, Azalea, Camellia, Maples, Loropetalum, Photinia, Leptospermum) will show chlorosis. Apply FeEDDHA iron chelate. Sulfur amendment to lower pH over 6+ months.' };
  if (ph >= 7.0) return { tone: 'amber', short: 'Slightly alkaline', long: 'Standard ornamentals fine. Acid-lovers may show mild chlorosis — preventive iron chelate helps. CA natives (Ceanothus, Carpenteria) and Mediterranean (Lavandula) are happy here.' };
  if (ph >= 6.5) return { tone: 'good', short: 'Near neutral', long: 'Sweet spot for most ornamentals. Acid-lovers acceptable; iron chelate as needed.' };
  if (ph >= 6.0) return { tone: 'good', short: 'Slightly acidic', long: 'Ideal for most plants including acid-lovers. No amendment needed.' };
  if (ph >= 5.5) return { tone: 'good', short: 'Acidic', long: 'Excellent for acid-lovers. Standard ornamentals also fine.' };
  if (ph >= 5.0) return { tone: 'amber', short: 'Strongly acidic', long: 'Acid-lovers thrive. Some ornamentals may show stunted growth. Lime if you want to raise pH for non-acid-lovers.' };
  return { tone: 'rose', short: 'Very acidic', long: 'Too acidic for most plants. Lime amendment recommended.' };
}

const CAT_STYLES = {
  prune: { color: 'text-emerald-800', bg: 'bg-emerald-100', label: 'Prune' },
  fertilize: { color: 'text-amber-900', bg: 'bg-amber-100', label: 'Fertilize' },
  pest: { color: 'text-rose-900', bg: 'bg-rose-100', label: 'Pest/Disease' },
  spray: { color: 'text-sky-900', bg: 'bg-sky-100', label: 'Spray' },
  water: { color: 'text-blue-900', bg: 'bg-blue-100', label: 'Water' },
  mulch: { color: 'text-stone-900', bg: 'bg-stone-100', label: 'Mulch' },
  enjoy: { color: 'text-fuchsia-900', bg: 'bg-fuchsia-100', label: 'Bloom' },
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// ============================================================
// MAIN APP
// ============================================================

export default function GardenApp() {
  const [tab, setTab] = useState('dashboard');
  const [plants, setPlants] = useState(PLANTS_SEED);
  const [taskState, setTaskState] = useState({}); // { taskId: { done, ts } }
  const [treatmentState, setTreatmentState] = useState({}); // { stepId: { done, ts } }
  const [notes, setNotes] = useState([]);
  const [phReadings, setPhReadings] = useState([]);
  const [schedules, setSchedules] = useState(DEFAULT_SCHEDULES);
  const [seasonView, setSeasonView] = useState('auto');
  const [loaded, setLoaded] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle' | 'saving' | 'saved' | 'error'
  const [editingPlant, setEditingPlant] = useState(null);
  const [filterLoc, setFilterLoc] = useState('all');
  const [search, setSearch] = useState('');
  const [expandedPlant, setExpandedPlant] = useState(null);
  const [expandedMonth, setExpandedMonth] = useState(null);

  const today = new Date();
  const currentMonth = MONTHS[today.getMonth()];
  const dateLabel = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  // Load from storage
  useEffect(() => {
    (async () => {
      try {
        const p = await window.storage.get('garden:plants');
        if (p?.value) {
          const saved = JSON.parse(p.value);
          // Merge: seed is authoritative for system fields (rationale, waterSource, etc.).
          // User-editable fields (bub, size, sizeVerify) preserved from saved data.
          const merged = PLANTS_SEED.map(seed => {
            const savedPlant = saved.find(s => s.id === seed.id);
            if (!savedPlant) return seed;
            const ws = getWaterSource(seed);
            return {
              ...seed,
              size: savedPlant.size || seed.size,
              qty: savedPlant.qty !== undefined ? savedPlant.qty : (seed.qty || 1),
              // Bub only meaningful for bubbler-watered plants; force 0 for others
              bub: ws === 'bubbler'
                ? (savedPlant.bub !== undefined ? savedPlant.bub : seed.bub)
                : 0,
              // Preserve user's flow setting if saved; else fall back to seed (which equals flowRec)
              flow: ws === 'bubbler'
                ? (savedPlant.flow || seed.flow || seed.flowRec)
                : seed.flow,
            };
          });
          setPlants(merged);
        }
      } catch (e) {}
      try {
        const t = await window.storage.get('garden:tasks');
        if (t?.value) setTaskState(JSON.parse(t.value));
      } catch (e) {}
      try {
        const tr = await window.storage.get('garden:treatments');
        if (tr?.value) setTreatmentState(JSON.parse(tr.value));
      } catch (e) {}
      try {
        const n = await window.storage.get('garden:notes');
        if (n?.value) setNotes(JSON.parse(n.value));
      } catch (e) {}
      try {
        const ph = await window.storage.get('garden:phReadings');
        if (ph?.value) setPhReadings(JSON.parse(ph.value));
      } catch (e) {}
      try {
        const sc = await window.storage.get('garden:schedules');
        if (sc?.value) {
          const parsed = JSON.parse(sc.value);
          setSchedules({ ...DEFAULT_SCHEDULES, ...parsed });
        }
      } catch (e) {}
      setLoaded(true);
    })();
  }, []);

  // Save wrapper that tracks status
  const saveToStorage = async (key, value) => {
    setSaveStatus('saving');
    try {
      const result = await window.storage.set(key, value);
      if (result === null || result === undefined) {
        // Storage didn't actually save — usually means artifact isn't published
        setSaveStatus('error');
      } else {
        setLastSaved(new Date());
        setSaveStatus('saved');
      }
    } catch (e) {
      setSaveStatus('error');
    }
  };

  // Persist plants
  useEffect(() => {
    if (!loaded) return;
    saveToStorage('garden:plants', JSON.stringify(plants));
  }, [plants, loaded]);

  // Persist tasks
  useEffect(() => {
    if (!loaded) return;
    saveToStorage('garden:tasks', JSON.stringify(taskState));
  }, [taskState, loaded]);

  // Persist treatments
  useEffect(() => {
    if (!loaded) return;
    saveToStorage('garden:treatments', JSON.stringify(treatmentState));
  }, [treatmentState, loaded]);

  // Persist notes
  useEffect(() => {
    if (!loaded) return;
    saveToStorage('garden:notes', JSON.stringify(notes));
  }, [notes, loaded]);

  // Persist phReadings
  useEffect(() => {
    if (!loaded) return;
    saveToStorage('garden:phReadings', JSON.stringify(phReadings));
  }, [phReadings, loaded]);

  // Persist schedules
  useEffect(() => {
    if (!loaded) return;
    saveToStorage('garden:schedules', JSON.stringify(schedules));
  }, [schedules, loaded]);

  const updateSchedule = (yard, patch) => {
    setSchedules(prev => ({ ...prev, [yard]: { ...prev[yard], ...patch } }));
  };

  // ===== EXPORT / IMPORT =====
  const exportData = () => {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      plants: plants.map(p => ({
        id: p.id,
        qty: getQty(p),
        size: p.size,
        bub: p.bub,
        flow: p.flow,
      })),
      schedules,
      taskState,
      treatmentState,
      notes,
      phReadings,
    };
    return JSON.stringify(payload, null, 2);
  };

  const importData = (jsonText) => {
    let parsed;
    try {
      parsed = JSON.parse(jsonText);
    } catch (e) {
      return { ok: false, error: 'Invalid JSON — could not parse the text.' };
    }
    if (!parsed || typeof parsed !== 'object') {
      return { ok: false, error: 'Imported data is not a valid object.' };
    }

    const summary = [];

    // Plants — merge into current plants by id
    if (Array.isArray(parsed.plants)) {
      const importMap = {};
      parsed.plants.forEach(p => { if (p && p.id) importMap[p.id] = p; });
      let changedCount = 0;
      setPlants(prev => prev.map(p => {
        const imp = importMap[p.id];
        if (!imp) return p;
        const updated = { ...p };
        if (imp.qty !== undefined) updated.qty = imp.qty;
        if (imp.size !== undefined) updated.size = imp.size;
        const ws = getWaterSource(p);
        if (ws === 'bubbler') {
          if (imp.bub !== undefined) updated.bub = imp.bub;
          if (imp.flow !== undefined) updated.flow = imp.flow;
        }
        changedCount++;
        return updated;
      }));
      summary.push(`${changedCount} plant entries`);
    }

    if (parsed.schedules && typeof parsed.schedules === 'object') {
      setSchedules({ ...DEFAULT_SCHEDULES, ...parsed.schedules });
      summary.push('schedules');
    }
    if (parsed.taskState && typeof parsed.taskState === 'object') {
      setTaskState(parsed.taskState);
      summary.push('task progress');
    }
    if (parsed.treatmentState && typeof parsed.treatmentState === 'object') {
      setTreatmentState(parsed.treatmentState);
      summary.push('treatment progress');
    }
    if (Array.isArray(parsed.notes)) {
      setNotes(parsed.notes);
      summary.push(`${parsed.notes.length} notes`);
    }
    if (Array.isArray(parsed.phReadings)) {
      setPhReadings(parsed.phReadings);
      summary.push(`${parsed.phReadings.length} pH readings`);
    }

    if (summary.length === 0) {
      return { ok: false, error: 'No recognizable data found in the imported text.' };
    }
    return { ok: true, summary: summary.join(', ') };
  };

  const addPhReading = (reading) => {
    setPhReadings(prev => [{ ...reading, id: Date.now().toString(), ts: new Date().toISOString() }, ...prev]);
  };

  const deletePhReading = (id) => {
    setPhReadings(prev => prev.filter(r => r.id !== id));
  };

  const updatePlant = (id, patch) => {
    setPlants(prev => prev.map(p => p.id === id ? { ...p, ...patch } : p));
  };

  const toggleTask = (id) => {
    setTaskState(prev => ({
      ...prev,
      [id]: prev[id]?.done ? { done: false } : { done: true, ts: new Date().toISOString() }
    }));
  };

  const toggleTreatmentStep = (id) => {
    setTreatmentState(prev => ({
      ...prev,
      [id]: prev[id]?.done ? { done: false } : { done: true, ts: new Date().toISOString() }
    }));
  };

  const addNote = (text) => {
    if (!text.trim()) return;
    setNotes(prev => [{ id: Date.now().toString(), text, ts: new Date().toISOString() }, ...prev]);
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  // Stats
  const stats = useMemo(() => {
    const activeTreatments = TREATMENTS.filter(t => t.severity === 'active').length;
    const watchItems = TREATMENTS.filter(t => t.severity === 'watch').length;
    const thisMonthTasks = MONTHLY_TASKS[currentMonth] || [];
    const monthDone = thisMonthTasks.filter(t => taskState[t.id]?.done).length;
    const monthOpen = thisMonthTasks.length - monthDone;
    const watering = {
      good: plants.filter(p => p.match === 'good').length,
      watch: plants.filter(p => p.match === 'watch').length,
      risk: plants.filter(p => p.match === 'risk').length,
    };
    const atRiskPlants = plants.filter(p => p.match === 'risk' || p.match === 'watch');
    return { activeTreatments, watchItems, thisMonthTasks, monthDone, monthOpen, watering, atRiskPlants };
  }, [plants, taskState, currentMonth]);

  const filteredPlants = useMemo(() => {
    return plants.filter(p => {
      if (filterLoc !== 'all' && p.loc !== filterLoc) return false;
      if (search && !p.common.toLowerCase().includes(search.toLowerCase()) && !p.sci.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [plants, filterLoc, search]);

  return (
    <div className="min-h-screen" style={{ background: '#faf7f2', fontFamily: '"DM Sans", system-ui, sans-serif', color: '#1a1f1a' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=DM+Sans:wght@400;500;600;700&display=swap');
        .display { font-family: 'Fraunces', Georgia, serif; font-feature-settings: 'ss01' on, 'ss02' on; letter-spacing: -0.01em; }
        .num { font-feature-settings: 'tnum' on, 'lnum' on; font-variant-numeric: tabular-nums; }
        .ink-divider { background: linear-gradient(90deg, transparent, #1a1f1a 20%, #1a1f1a 80%, transparent); height: 1px; }
        .grain {
          background-image: radial-gradient(rgba(0,0,0,0.012) 1px, transparent 1px);
          background-size: 4px 4px;
        }
      `}</style>

      {/* HEADER */}
      <div className="border-b border-stone-300/70" style={{ background: '#f5f0e6' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-6 md:py-8">
          <div className="flex items-end justify-between flex-wrap gap-4 md:gap-6">
            <div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-stone-600 mb-2">Belmont, California · Sunset Zone 16 · USDA 9b</div>
              <h1 className="display text-3xl md:text-6xl font-medium leading-none">Belburn Garden</h1>
              <div className="text-xs md:text-sm text-stone-700 mt-2 md:mt-3 num">{dateLabel}</div>
              <SaveIndicator status={saveStatus} lastSaved={lastSaved} />
            </div>
            <div className="flex gap-4 md:gap-6 items-end">
              <Stat num={plants.reduce((s, p) => s + getQty(p), 0)} label="Plants" />
              <Stat num={stats.activeTreatments} label="Active issues" tone={stats.activeTreatments ? 'rose' : 'default'} />
              <Stat num={stats.monthOpen} label={`${currentMonth} open`} tone={stats.monthOpen ? 'amber' : 'default'} />
            </div>
          </div>
        </div>
      </div>

      {/* NAV */}
      <div className="sticky top-0 z-10 border-b border-stone-300/70 backdrop-blur" style={{ background: 'rgba(250,247,242,0.92)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-10 flex gap-1 overflow-x-auto">
          <NavTab id="dashboard" tab={tab} setTab={setTab} icon={Leaf}>Dashboard</NavTab>
          <NavTab id="plants" tab={tab} setTab={setTab} icon={Sprout}>Plants ({plants.reduce((s, p) => s + getQty(p), 0)})</NavTab>
          <NavTab id="issues" tab={tab} setTab={setTab} icon={Bug}>Issues ({stats.activeTreatments})</NavTab>
          <NavTab id="calendar" tab={tab} setTab={setTab} icon={Calendar}>Calendar</NavTab>
          <NavTab id="watering" tab={tab} setTab={setTab} icon={Droplets}>Watering</NavTab>
          <NavTab id="fertilizer" tab={tab} setTab={setTab} icon={Sprout}>Fertilizer</NavTab>
          <NavTab id="notes" tab={tab} setTab={setTab} icon={BookOpen}>Notes ({notes.length})</NavTab>
          <NavTab id="data" tab={tab} setTab={setTab} icon={Wrench}>Data</NavTab>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-6 md:py-10">

        {/* DASHBOARD */}
        {tab === 'dashboard' && (
          <div className="space-y-10">
            {/* Right now */}
            <section>
              <SectionHead small="01" title="Right now" sub="What needs your attention this month" />
              <div className="grid md:grid-cols-3 gap-5">
                <Card title="Active treatments" tone="rose">
                  <div className="space-y-3">
                    {TREATMENTS.filter(t => t.severity === 'active').map(t => {
                      const total = t.steps.length;
                      const done = t.steps.filter(s => treatmentState[s.id]?.done).length;
                      return (
                        <div key={t.id}>
                          <div className="flex justify-between items-baseline text-sm">
                            <span className="font-semibold">{t.title.split('—')[0].trim()}</span>
                            <span className="num text-stone-600">{done}/{total}</span>
                          </div>
                          <div className="h-1 bg-stone-200 rounded-full overflow-hidden mt-1">
                            <div className="h-full bg-rose-700" style={{ width: `${(done/total)*100}%` }} />
                          </div>
                        </div>
                      );
                    })}
                    <button onClick={() => setTab('issues')} className="text-xs text-rose-900 underline underline-offset-2 mt-2">View full plans →</button>
                  </div>
                </Card>

                <Card title={`${currentMonth} tasks`} tone="amber">
                  <div className="space-y-2">
                    {(MONTHLY_TASKS[currentMonth] || []).slice(0, 5).map(t => (
                      <button key={t.id} onClick={() => toggleTask(t.id)} className="flex items-start gap-2 text-left w-full text-sm hover:bg-stone-50 -mx-2 px-2 py-1 rounded">
                        {taskState[t.id]?.done
                          ? <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-700 shrink-0" />
                          : <Circle className="w-4 h-4 mt-0.5 text-stone-400 shrink-0" />}
                        <span className={taskState[t.id]?.done ? 'text-stone-400 line-through' : ''}>
                          <span className={`${CAT_STYLES[t.cat].bg} ${CAT_STYLES[t.cat].color} text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider mr-2 font-semibold`}>{CAT_STYLES[t.cat].label}</span>
                          {t.text.split('.')[0]}.
                        </span>
                      </button>
                    ))}
                    <button onClick={() => setTab('calendar')} className="text-xs text-amber-900 underline underline-offset-2 mt-2">All {currentMonth} tasks →</button>
                  </div>
                </Card>

                <Card title="Watering match" tone="default">
                  <div className="grid grid-cols-3 gap-2 text-center mb-3">
                    <MiniStat num={stats.watering.good} label="Good" tone="emerald" />
                    <MiniStat num={stats.watering.watch} label="Watch" tone="amber" />
                    <MiniStat num={stats.watering.risk} label="Risk" tone="rose" />
                  </div>
                  <div className="text-xs text-stone-700 mb-2">{stats.atRiskPlants.length} plants flagged. Topsoil drains in 2-3 days; bubbler counts adjusted accordingly.</div>
                  <button onClick={() => setTab('watering')} className="text-xs text-stone-700 underline underline-offset-2">Watering plan →</button>
                </Card>
              </div>
            </section>

            {/* Bloom now */}
            <section>
              <SectionHead small="02" title="Blooming or about to" sub="What to watch for in the garden right now" />
              <div className="bg-white border border-stone-300 rounded-sm p-6">
                <div className="grid md:grid-cols-2 gap-x-10 gap-y-3">
                  <BloomItem name="Carpenteria 'Elizabeth'" detail="Currently flowering — white with golden centers, fragrant. Peak May-July." status="now" />
                  <BloomItem name="Azalea 'Happy Days'" detail="Pink/violet — should be finishing. Encore series may rebloom late summer." status="now" />
                  <BloomItem name="Ceanothus 'Skylark'" detail="Cobalt blue cones — peak window. Don't fertilize, don't prune until after." status="now" />
                  <BloomItem name="Loropetalum 'Razzleberri'" detail="Pink fringe — peak now. Light prune after bloom." status="now" />
                  <BloomItem name="Camellia japonica" detail="Late cultivars finishing. Rake fallen petals (petal blight prevention)." status="now" />
                  <BloomItem name="Bougainvillea (3)" detail="Ramping — drought stress will boost bloom intensity. Low-N feed in June." status="soon" />
                  <BloomItem name="Anigozanthos 'Big Red'" detail="Spring–summer; spikes emerging." status="soon" />
                  <BloomItem name="Bottlebrush" detail="Spring spikes April–June; established tree, just enjoy." status="now" />
                  <BloomItem name="Salvia microphylla" detail="Continuous through fall." status="now" />
                  <BloomItem name="Polygala myrtifolia" detail="Near year-round in this climate." status="now" />
                  <BloomItem name="Hippeastrum striatum" detail="Striped trumpets — late spring." status="soon" />
                  <BloomItem name="Cassia leptophylla" detail="Late summer (Jul-Sep). Just leafing now." status="later" />
                </div>
              </div>
            </section>

            {/* Plants at risk */}
            {stats.atRiskPlants.length > 0 && (
              <section>
                <SectionHead small="03" title="Plants flagged" sub="Watering match issues to monitor" />
                <div className="space-y-2">
                  {stats.atRiskPlants.map(p => (
                    <div key={p.id} className={`border rounded-sm p-4 flex items-start gap-4 ${MATCH_STYLES[p.match].bg} ${MATCH_STYLES[p.match].border}`}>
                      <div className={`w-2 h-2 rounded-full mt-2 ${MATCH_STYLES[p.match].dot}`} />
                      <div className="flex-1">
                        <div className="flex justify-between items-baseline flex-wrap gap-2">
                          <div className="display text-lg">{p.common}</div>
                          <div className="text-xs uppercase tracking-wider text-stone-600 num">{LOC_LABEL[p.loc]} · {SIZE_LABEL[p.size]} · {p.bub} bubbler{p.bub === 1 ? '' : 's'}</div>
                        </div>
                        <div className="text-sm mt-2 text-stone-800">{p.rationale}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* PLANTS */}
        {tab === 'plants' && (
          <div className="space-y-6">
            <SectionHead small="P" title="Plant inventory" sub={`${filteredPlants.length} of ${plants.length} plants`} />

            {/* Filters */}
            <div className="flex gap-3 flex-wrap items-center bg-white border border-stone-300 rounded-sm p-4">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-stone-500" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by name…"
                  className="px-3 py-1.5 text-sm border border-stone-300 rounded-sm bg-white w-48 focus:outline-none focus:border-emerald-700"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-stone-500" />
                <select value={filterLoc} onChange={e => setFilterLoc(e.target.value)} className="px-3 py-1.5 text-sm border border-stone-300 rounded-sm bg-white">
                  <option value="all">All locations</option>
                  <option value="backyard-topsoil">Backyard — Topsoil</option>
                  <option value="backyard-ground">Backyard — Ground</option>
                  <option value="frontyard-ground">Frontyard — Ground</option>
                  <option value="indoor">Indoor</option>
                </select>
              </div>
              <div className="text-xs text-stone-600 ml-auto">Click a plant to expand. Edit bubbler count or size as needed.</div>
            </div>

            {/* Plant list */}
            <div className="space-y-2">
              {filteredPlants.map(p => (
                <PlantCard
                  key={p.id}
                  plant={p}
                  expanded={expandedPlant === p.id}
                  onToggle={() => setExpandedPlant(expandedPlant === p.id ? null : p.id)}
                  onUpdate={(patch) => updatePlant(p.id, patch)}
                  isEditing={editingPlant === p.id}
                  setEditing={(v) => setEditingPlant(v ? p.id : null)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ACTIVE ISSUES */}
        {tab === 'issues' && (
          <div className="space-y-8">
            <SectionHead small="I" title="Active issues + watch list" sub="Treatment plans with step-by-step protocols" />
            <div className="space-y-6">
              {TREATMENTS.map(t => (
                <TreatmentCard
                  key={t.id}
                  treatment={t}
                  treatmentState={treatmentState}
                  onToggle={toggleTreatmentStep}
                  plants={plants}
                />
              ))}
            </div>
          </div>
        )}

        {/* CALENDAR */}
        {tab === 'calendar' && (
          <div className="space-y-6">
            <SectionHead small="C" title="Care calendar" sub={`Belmont CA seasonal schedule. ${currentMonth} highlighted.`} />
            <div className="space-y-2">
              {MONTHS.map(m => (
                <MonthCard
                  key={m}
                  month={m}
                  current={currentMonth === m}
                  expanded={expandedMonth === m || currentMonth === m}
                  onToggle={() => setExpandedMonth(expandedMonth === m ? null : m)}
                  taskState={taskState}
                  toggleTask={toggleTask}
                />
              ))}
            </div>
          </div>
        )}

        {/* WATERING */}
        {tab === 'watering' && (
          <div className="space-y-8">
            <SectionHead small="W" title="Watering plan" sub="By water source — bubblers, lawn sprinklers, self-sustaining" />

            <div className="bg-white border border-stone-300 rounded-sm p-6">
              <div className="display text-2xl mb-3">The setup</div>
              <div className="space-y-3 text-sm text-stone-800 max-w-3xl">
                <p>Three soil zones, four water sources:</p>
                <div className="grid md:grid-cols-3 gap-3 my-4">
                  <div className="bg-amber-50 border border-amber-200 rounded-sm p-3">
                    <div className="text-xs uppercase tracking-wider text-amber-900 mb-1">Backyard topsoil bed</div>
                    <div className="text-sm text-amber-900">Behind 2-ft bench wall. 1 ft loose dirt + 1 ft topsoil. Drains 2-3 days. Drought-lovers thrive; moisture-lovers need help.</div>
                  </div>
                  <div className="bg-rose-50 border border-rose-200 rounded-sm p-3">
                    <div className="text-xs uppercase tracking-wider text-rose-900 mb-1">Backyard ground</div>
                    <div className="text-sm text-rose-900">Few inches topsoil over native. <span className="font-semibold">Surprisingly fast drainage</span> — dry at 6-12" depth within 12 hrs. Deep-rooted trees can reach water table; small plants cannot.</div>
                  </div>
                  <div className="bg-sky-50 border border-sky-200 rounded-sm p-3">
                    <div className="text-xs uppercase tracking-wider text-sky-900 mb-1">Frontyard ground</div>
                    <div className="text-sm text-sky-900">Thin topsoil over Belmont native clay. Holds moisture longer. Moisture-lovers (Camellia, Maple) thrive; drought-lovers (Lavandula, Leptospermum) at risk.</div>
                  </div>
                </div>
                <p className="font-semibold pt-1">Bubbler math: ILB4PKSX is adjustable 0–13 GPH. Per cycle: LOW (~3 GPH) for 10 min = 0.5 gal · MEDIUM (~7 GPH) = 1.2 gal · HIGH (~13 GPH) = 2.2 gal. Cycles per week = 7 ÷ interval days (so 5-day interval = 1.4 cycles/wk).</p>
                <div className="bg-stone-50 rounded-sm p-3 text-xs num font-mono text-stone-800">
                  Delivered/wk = bubblers × GPH × (runtime ÷ 60) × (7 ÷ interval days)
                </div>
                <p className="pt-1">Schedule controls below are editable per yard. Each plant has independent bubbler count + flow toggles. Status auto-computes based on need range. "Under" doesn\'t always require action — clay retention, neighboring bubbler overlap, and species tolerance compensate. Look for actual plant decline before changing.</p>
              </div>
            </div>

            <div className="bg-white border border-stone-300 rounded-sm p-4 md:p-6">
              <div className="display text-xl md:text-2xl mb-3">Seasonal water needs</div>
              <div className="text-xs md:text-sm text-stone-700 mb-4 max-w-3xl space-y-2">
                <p>Plant water needs swing dramatically by season. Belmont (CIMIS Zone 3 coastal) goes from <span className="font-semibold">peak ETo of 0.19"/day in June to 0.04"/day in December</span> — winter needs are about 25% of summer. The need ranges in the table below scale by the seasonal factor.</p>
                <p>Your Rachio handles the schedule side: <span className="font-semibold">tighter intervals in summer (3-4 days) and longer in spring/fall (5-7 days)</span>. Update the schedule controls below as Rachio shifts. Backyard runtime is capped at <span className="font-semibold">15 min</span> (water drains beyond that), so summer compensation comes from shorter intervals — not longer runs.</p>
              </div>
              <div className="bg-stone-50 border border-stone-200 rounded-sm p-3 md:p-4">
                <div className="text-xs uppercase tracking-wider text-stone-600 mb-2">View needs for season</div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {Object.entries(SEASON_PRESETS).map(([key, preset]) => {
                    const selected = seasonView === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSeasonView(key)}
                        className={`px-3 py-1.5 text-xs uppercase tracking-wider rounded-sm border transition ${
                          selected
                            ? 'bg-stone-800 text-white border-stone-800'
                            : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
                <div className="text-xs md:text-sm text-stone-700 num">
                  Currently viewing: <span className="font-semibold">{getSeasonalLabel(seasonView)}</span> · need ranges multiplied by <span className="font-semibold">{getSeasonalFactor(seasonView).toFixed(2)}×</span> {seasonView === 'summer' ? '(peak)' : ''}
                </div>
              </div>
            </div>

            <div className="bg-stone-100 border border-stone-300 rounded-sm p-5">
              <div className="display text-lg mb-2">Coverage caveat</div>
              <div className="text-sm text-stone-800 max-w-3xl space-y-2">
                <p>Bubbler footprint at full flow is ~1 ft diameter (your observation). At LOW it\'s less — maybe 6". A 5-gal plant\'s root zone is ~12-18" wide; a 15-gal plant\'s is ~24-36" wide. <span className="font-semibold">This means a single bubbler often only wets 25-50% of a larger plant\'s root zone</span>, which explains your probe finding dry spots 12 hrs after watering.</p>
                <p><span className="font-semibold">Practical fix:</span> probe 3-4 spots around each plant (not just one) to find the wet zones. If all spots are dry within 12 hrs, the bubbler isn\'t getting enough volume in. If only some are dry, bubbler position is the issue — consider adding a 2nd bubbler positioned on the opposite side of the plant for larger root zones.</p>
              </div>
            </div>

            <div className="bg-rose-50 border border-rose-200 rounded-sm p-6">
              <div className="display text-xl mb-3 text-rose-900">Plants flagged in math vs reality</div>
              <div className="space-y-2.5 text-sm text-rose-900">
                <div className="flex gap-3"><span className="font-semibold whitespace-nowrap min-w-[140px]">Under by math, OK in practice:</span><span>Carpenteria, Phormium (clay holds), Wax Leaf Privet, Camellia, frontyard Maple. The math undershoots, but plants are growing and clay/topsoil retention compensates. Don\'t change unless decline shows.</span></div>
                <div className="flex gap-3"><span className="font-semibold whitespace-nowrap min-w-[140px]">Intentionally under:</span><span>Photinia hedge — water-restricted to fight Entomosporium. Sanitation > water for disease control.</span></div>
                <div className="flex gap-3"><span className="font-semibold whitespace-nowrap min-w-[140px]">At upper limit:</span><span>Lavandula (need 0-1, getting 1) — fine for now. Ceanothus (need 0-1, getting 1) — consider OFF Jun-Sep.</span></div>
                <div className="flex gap-3"><span className="font-semibold whitespace-nowrap min-w-[140px]">Watch for stress:</span><span>If chlorosis, leaf scorch, or wilting appears on Camellia or frontyard Maple, bump flow to HIGH or add 2nd bubbler.</span></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div className="display text-2xl">Bubbler audit</div>
                <button
                  onClick={() => {
                    if (confirm('Set every bubbler-watered plant\'s bubbler count AND flow to its recommendation? Your current edits will be overwritten.')) {
                      setPlants(prev => prev.map(p => getWaterSource(p) === 'bubbler' ? ({ ...p, bub: p.recBub, flow: p.flowRec }) : p));
                    }
                  }}
                  className="px-3 py-1.5 text-xs uppercase tracking-wider border border-stone-400 rounded-sm bg-white hover:bg-stone-100 transition flex items-center gap-2"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  Apply recommended to all
                </button>
              </div>

              {/* Schedule controls */}
              <div className="grid md:grid-cols-2 gap-3 mb-6">
                {(() => {
                  const backyardPlants = plants.filter(p => getWaterSource(p) === 'bubbler' && getPlantScheduleKey(p) === 'backyard');
                  const frontyardPlants = plants.filter(p => getWaterSource(p) === 'bubbler' && getPlantScheduleKey(p) === 'frontyard');
                  const backyardTotal = backyardPlants.reduce((sum, p) => sum + flowGalPerWeek(p.flow, p.bub, schedules.backyard.runtime, schedules.backyard.interval) * getQty(p), 0);
                  const frontyardTotal = frontyardPlants.reduce((sum, p) => sum + flowGalPerWeek(p.flow, p.bub, schedules.frontyard.runtime, schedules.frontyard.interval) * getQty(p), 0);
                  const backyardCount = backyardPlants.reduce((s, p) => s + getQty(p), 0);
                  const frontyardCount = frontyardPlants.reduce((s, p) => s + getQty(p), 0);
                  return (
                    <>
                      <ScheduleControl
                        label="Backyard bubbler schedule"
                        runtime={schedules.backyard.runtime}
                        interval={schedules.backyard.interval}
                        onChange={(p) => updateSchedule('backyard', p)}
                        plantCount={backyardCount}
                        totalDelivered={backyardTotal}
                        maxRuntime={MAX_RUNTIME.backyard}
                      />
                      <ScheduleControl
                        label="Frontyard bubbler schedule"
                        runtime={schedules.frontyard.runtime}
                        interval={schedules.frontyard.interval}
                        onChange={(p) => updateSchedule('frontyard', p)}
                        plantCount={frontyardCount}
                        totalDelivered={frontyardTotal}
                        maxRuntime={MAX_RUNTIME.frontyard}
                      />
                    </>
                  );
                })()}
              </div>

              {['backyard-topsoil', 'backyard-ground', 'frontyard-ground'].map(loc => {
                const locPlants = plants.filter(p => p.loc === loc && getWaterSource(p) === 'bubbler');
                if (locPlants.length === 0) return null;
                const schedKey = loc.startsWith('backyard') ? 'backyard' : 'frontyard';
                const sched = schedules[schedKey];
                return (
                  <div key={loc} className="mb-6">
                    <div className="text-xs md:text-sm uppercase tracking-[0.2em] text-stone-600 mb-2">{LOC_LABEL[loc]} <span className="text-stone-400 normal-case tracking-normal text-[10px] md:text-xs">· {sched.runtime} min every {sched.interval} days</span></div>

                    {/* Desktop table */}
                    <div className="hidden md:block bg-white border border-stone-300 rounded-sm overflow-hidden">
                      <table className="w-full text-sm">
                        <thead style={{ background: '#f5f0e6' }} className="text-xs uppercase tracking-wider text-stone-700">
                          <tr>
                            <th className="text-left px-4 py-2 font-semibold">Plant</th>
                            <th className="text-left px-2 py-2 font-semibold">Qty</th>
                            <th className="text-left px-2 py-2 font-semibold">Bub</th>
                            <th className="text-left px-2 py-2 font-semibold">Flow</th>
                            <th className="text-left px-2 py-2 font-semibold">Need ea</th>
                            <th className="text-left px-2 py-2 font-semibold">Delivered</th>
                            <th className="text-left px-4 py-2 font-semibold">Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {locPlants.map((p, i) => {
                            const q = getQty(p);
                            const seasonFactor = getSeasonalFactor(seasonView);
                            const adjMin = p.needMin * seasonFactor;
                            const adjMax = p.needMax * seasonFactor;
                            const deliveredEach = flowGalPerWeek(p.flow, p.bub, sched.runtime, sched.interval);
                            const deliveredTotal = deliveredEach * q;
                            let dStatus, dClass;
                            if (deliveredEach === 0 && adjMax === 0) {
                              dStatus = 'OK'; dClass = 'bg-emerald-100 text-emerald-900';
                            } else if (deliveredEach < adjMin * 0.7) {
                              dStatus = 'Under'; dClass = 'bg-amber-100 text-amber-900';
                            } else if (deliveredEach > adjMax * 1.3) {
                              dStatus = 'Over'; dClass = 'bg-sky-100 text-sky-900';
                            } else {
                              dStatus = 'Match'; dClass = 'bg-emerald-100 text-emerald-900';
                            }
                            return (
                              <tr key={p.id} className={i % 2 ? 'bg-stone-50/50' : ''}>
                                <td className="px-4 py-3 align-top">
                                  <div className="font-medium">{p.common}</div>
                                  <div className="text-xs italic text-stone-500">{p.sci}</div>
                                  <div className="text-[10px] uppercase tracking-wider text-stone-500 mt-1">{SIZE_LABEL[p.size]}</div>
                                </td>
                                <td className="px-2 py-3 align-top">
                                  <QtyStepper value={q} onChange={(n) => updatePlant(p.id, { qty: n })} />
                                </td>
                                <td className="px-2 py-3 align-top">
                                  <BubblerToggle
                                    value={p.bub}
                                    onChange={(n) => updatePlant(p.id, { bub: n })}
                                    recommended={p.recBub}
                                    size="sm"
                                  />
                                </td>
                                <td className="px-2 py-3 align-top">
                                  <FlowToggle
                                    value={p.flow}
                                    onChange={(f) => updatePlant(p.id, { flow: f })}
                                    recommended={p.flowRec}
                                    size="sm"
                                  />
                                </td>
                                <td className="px-2 py-3 align-top text-stone-700 num text-xs">
                                  <div className="font-semibold">{adjMin.toFixed(1)}–{adjMax.toFixed(1)}</div>
                                  <div className="text-[10px] text-stone-500">gal/wk{seasonFactor !== 1 ? ` · ${seasonFactor.toFixed(2)}×` : ''}</div>
                                </td>
                                <td className="px-2 py-3 align-top num text-xs">
                                  <div className="font-semibold">{deliveredEach.toFixed(1)} ea</div>
                                  {q > 1 && <div className="text-[10px] text-stone-700 num">{deliveredTotal.toFixed(1)} total</div>}
                                  <div className={`inline-block mt-0.5 px-1.5 py-0.5 text-[10px] uppercase tracking-wider rounded-sm ${dClass}`}>{dStatus}</div>
                                </td>
                                <td className="px-4 py-3 text-stone-700 align-top text-xs">{p.rationale}</td>
                              </tr>
                            );
                          })}
                          {/* Zone total row — verifies sum equals header zone total */}
                          {(() => {
                            const zoneTotal = locPlants.reduce((sum, p) =>
                              sum + flowGalPerWeek(p.flow, p.bub, sched.runtime, sched.interval) * getQty(p), 0
                            );
                            const totalQty = locPlants.reduce((sum, p) => sum + getQty(p), 0);
                            return (
                              <tr className="bg-stone-100 border-t-2 border-stone-400 font-semibold">
                                <td className="px-4 py-3 text-xs">Zone total ({totalQty} plants)</td>
                                <td className="px-2 py-3 num text-xs">{totalQty}</td>
                                <td colSpan={3}></td>
                                <td className="px-2 py-3 num text-xs">
                                  <div className="font-bold">{zoneTotal.toFixed(1)} gal/wk</div>
                                  <div className="text-[10px] font-normal text-stone-600">sum of "total" column</div>
                                </td>
                                <td className="px-4 py-3 text-[10px] text-stone-600 italic">Matches the zone total at the top of this section</td>
                              </tr>
                            );
                          })()}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile card list */}
                    <div className="md:hidden space-y-2">
                      {locPlants.map((p) => {
                        const q = getQty(p);
                        const seasonFactor = getSeasonalFactor(seasonView);
                        const adjMin = p.needMin * seasonFactor;
                        const adjMax = p.needMax * seasonFactor;
                        const deliveredEach = flowGalPerWeek(p.flow, p.bub, sched.runtime, sched.interval);
                        const deliveredTotal = deliveredEach * q;
                        let dStatus, dClass;
                        if (deliveredEach === 0 && adjMax === 0) {
                          dStatus = 'OK'; dClass = 'bg-emerald-100 text-emerald-900';
                        } else if (deliveredEach < adjMin * 0.7) {
                          dStatus = 'Under'; dClass = 'bg-amber-100 text-amber-900';
                        } else if (deliveredEach > adjMax * 1.3) {
                          dStatus = 'Over'; dClass = 'bg-sky-100 text-sky-900';
                        } else {
                          dStatus = 'Match'; dClass = 'bg-emerald-100 text-emerald-900';
                        }
                        return (
                          <div key={p.id} className="bg-white border border-stone-300 rounded-sm p-3">
                            <div className="flex justify-between items-baseline gap-2 mb-2">
                              <div className="min-w-0 flex-1">
                                <div className="font-medium text-sm leading-tight">
                                  {p.common}
                                  {q > 1 && <span className="text-stone-500 ml-1 text-xs">×{q}</span>}
                                </div>
                                <div className="text-[10px] uppercase tracking-wider text-stone-500 mt-0.5">{SIZE_LABEL[p.size]}</div>
                              </div>
                              <div className="text-right shrink-0">
                                <div className="num font-semibold text-sm">{deliveredEach.toFixed(1)} <span className="text-[10px] text-stone-500">ea/wk</span></div>
                                {q > 1 && <div className="num text-[10px] text-stone-700">{deliveredTotal.toFixed(1)} total</div>}
                                <div className={`inline-block mt-0.5 px-1.5 py-0.5 text-[10px] uppercase tracking-wider rounded-sm ${dClass}`}>{dStatus}</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 mb-2">
                              <div>
                                <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">Qty</div>
                                <QtyStepper value={q} onChange={(n) => updatePlant(p.id, { qty: n })} />
                              </div>
                              <div>
                                <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">Bubblers</div>
                                <BubblerToggle
                                  value={p.bub}
                                  onChange={(n) => updatePlant(p.id, { bub: n })}
                                  recommended={p.recBub}
                                  size="sm"
                                />
                              </div>
                              <div>
                                <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">Need ea</div>
                                <div className="text-xs num font-semibold">{adjMin.toFixed(1)}–{adjMax.toFixed(1)}</div>
                                {seasonFactor !== 1 && <div className="text-[9px] text-stone-500">{seasonFactor.toFixed(2)}×</div>}
                              </div>
                            </div>
                            <div className="mb-2">
                              <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">Flow</div>
                              <FlowToggle
                                value={p.flow}
                                onChange={(f) => updatePlant(p.id, { flow: f })}
                                recommended={p.flowRec}
                                size="sm"
                              />
                            </div>
                            <div className="text-[11px] text-stone-600 leading-snug pt-2 border-t border-stone-100">{p.rationale}</div>
                          </div>
                        );
                      })}
                      {/* Zone total card for mobile */}
                      {(() => {
                        const zoneTotal = locPlants.reduce((sum, p) =>
                          sum + flowGalPerWeek(p.flow, p.bub, sched.runtime, sched.interval) * getQty(p), 0
                        );
                        const totalQty = locPlants.reduce((sum, p) => sum + getQty(p), 0);
                        return (
                          <div className="bg-stone-100 border-2 border-stone-400 rounded-sm p-3">
                            <div className="flex justify-between items-baseline gap-2">
                              <div className="text-sm font-semibold">Zone total</div>
                              <div className="text-right">
                                <div className="num font-bold text-sm">{zoneTotal.toFixed(1)} gal/wk</div>
                                <div className="text-[10px] text-stone-600">{totalQty} plants</div>
                              </div>
                            </div>
                            <div className="text-[10px] text-stone-600 mt-1 italic">Sum of all "total" values above. Matches the zone total shown at the top.</div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sprinkler-watered */}
            {plants.filter(p => getWaterSource(p) === 'sprinkler').length > 0 && (
              <div>
                <div className="display text-xl md:text-2xl mb-2">Lawn sprinklers</div>
                <div className="text-xs md:text-sm text-stone-600 mb-4">Three NEW small trees in the front lawn. No bubblers. Lawn schedule: 10 min/5 days; soil dries in 4-5 days per probe (clay holds longer than topsoil). Adequate for establishment; reassess in years 3+ once roots are deep.</div>
                <div className="space-y-2">
                  {plants.filter(p => getWaterSource(p) === 'sprinkler').map((p) => (
                    <div key={p.id} className="bg-white border border-stone-300 rounded-sm p-3 md:p-4">
                      <div className="flex justify-between items-baseline gap-2 mb-2">
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm md:text-base">{p.common}</div>
                          <div className="text-xs italic text-stone-500">{p.sci}</div>
                          <div className="text-[10px] uppercase tracking-wider text-stone-500 mt-1">{SIZE_LABEL[p.size]}</div>
                        </div>
                        <span className={`shrink-0 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs ${MATCH_STYLES[p.match].bg} ${MATCH_STYLES[p.match].text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${MATCH_STYLES[p.match].dot}`} />
                          {MATCH_STYLES[p.match].label}
                        </span>
                      </div>
                      <div className="text-xs md:text-sm text-stone-700 leading-snug">{p.rationale}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Self-sustaining */}
            {plants.filter(p => getWaterSource(p) === 'natural').length > 0 && (
              <div>
                <div className="display text-xl md:text-2xl mb-2">Self-sustaining</div>
                <div className="text-xs md:text-sm text-stone-600 mb-4">Mature trees with deep roots. No irrigation. Hand-water only if extended drought + visible distress.</div>
                <div className="space-y-2">
                  {plants.filter(p => getWaterSource(p) === 'natural').map((p) => (
                    <div key={p.id} className="bg-white border border-stone-300 rounded-sm p-3 md:p-4">
                      <div className="flex justify-between items-baseline gap-2 mb-2">
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm md:text-base">{p.common}</div>
                          <div className="text-xs italic text-stone-500">{p.sci}</div>
                          <div className="text-[10px] uppercase tracking-wider text-stone-500 mt-1">{SIZE_LABEL[p.size]}</div>
                        </div>
                        <span className={`shrink-0 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs ${MATCH_STYLES[p.match].bg} ${MATCH_STYLES[p.match].text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${MATCH_STYLES[p.match].dot}`} />
                          {MATCH_STYLES[p.match].label}
                        </span>
                      </div>
                      <div className="text-xs md:text-sm text-stone-700 leading-snug">{p.rationale}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Indoor schedule */}
            <div>
              <div className="display text-xl md:text-2xl mb-2">Indoor — hand-watered drench schedule</div>
              <div className="text-xs md:text-sm text-stone-600 mb-4">Drench-and-drain method: water until it runs through bottom drainage, empty saucer. No bubblers, no flow toggles.</div>

              {/* Desktop */}
              <div className="hidden md:block bg-white border border-stone-300 rounded-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead style={{ background: '#f5f0e6' }} className="text-xs uppercase tracking-wider text-stone-700">
                    <tr>
                      <th className="text-left px-4 py-2 font-semibold">Plant</th>
                      <th className="text-left px-2 py-2 font-semibold">Frequency</th>
                      <th className="text-left px-4 py-2 font-semibold">Notes</th>
                      <th className="text-center px-2 py-2 font-semibold">Match</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plants.filter(p => p.loc === 'indoor').map((p, i) => (
                      <tr key={p.id} className={i % 2 ? 'bg-stone-50/50' : ''}>
                        <td className="px-4 py-3 align-top">
                          <div className="font-medium">{p.common}</div>
                          <div className="text-xs italic text-stone-500">{p.sci}</div>
                        </td>
                        <td className="px-2 py-3 align-top">
                          <span className={`inline-block px-2 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-sm ${p.indoorFreqDays === 14 ? 'bg-sky-100 text-sky-900' : 'bg-emerald-100 text-emerald-900'}`}>
                            Every {p.indoorFreqDays} days
                          </span>
                        </td>
                        <td className="px-4 py-3 text-stone-700 align-top text-xs">{p.rationale}</td>
                        <td className="text-center px-2 py-3 align-top">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs ${MATCH_STYLES[p.match].bg} ${MATCH_STYLES[p.match].text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${MATCH_STYLES[p.match].dot}`} />
                            {MATCH_STYLES[p.match].label}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile */}
              <div className="md:hidden space-y-2">
                {plants.filter(p => p.loc === 'indoor').map((p) => (
                  <div key={p.id} className="bg-white border border-stone-300 rounded-sm p-3">
                    <div className="flex justify-between items-baseline gap-2 mb-1.5">
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm leading-tight">{p.common}</div>
                        <div className="text-xs italic text-stone-500 truncate">{p.sci}</div>
                      </div>
                      <span className={`shrink-0 inline-block px-2 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-sm ${p.indoorFreqDays === 14 ? 'bg-sky-100 text-sky-900' : 'bg-emerald-100 text-emerald-900'}`}>
                        Every {p.indoorFreqDays}d
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-600 leading-snug">{p.rationale}</div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-sm p-4 mt-3">
                <div className="text-xs uppercase tracking-wider text-amber-900 mb-1">Two flagged plants</div>
                <div className="text-xs md:text-sm text-amber-900 space-y-1.5">
                  <div><span className="font-semibold">Fiddle Leaf Fig at 14 days:</span> on the long side for active growth (Apr-Sep). FLF is sensitive to inconsistency; if leaves drop or droop, shorten to 10 days for the growing season. 14 days is fine for fall/winter.</div>
                  <div><span className="font-semibold">Peperomia at 7 days:</span> semi-succulent prefers drying between waterings. If you see soft/yellowing leaves or stem softness, stretch to 10 days.</div>
                </div>
              </div>
            </div>

            <PlanterWateringSection />

            <VeggieWateringSection />

            <LawnWateringSection />

            <div className="bg-amber-50 border border-amber-200 rounded-sm p-5">
              <div className="display text-lg mb-2 text-amber-900">Heat wave protocol</div>
              <div className="text-sm text-amber-900 space-y-2">
                <p>Forecast 90°F+ for 3+ consecutive days:</p>
                <ul className="ml-5 list-disc space-y-1">
                  <li><span className="font-semibold">Bubbler-watered:</span> run an extra cycle on day 3, or hand-water the moisture-lovers (Gardenia, Azalea, both Maples, Camellia). Topsoil bed will be the first to fail.</li>
                  <li><span className="font-semibold">Sprinkler-watered trees:</span> if lawn shows stress, run lawn sprinklers an extra cycle.</li>
                  <li><span className="font-semibold">Self-sustaining:</span> hand-water only if visible wilt that doesn't recover overnight. The Bottlebrush and Cabbage Tree have demonstrated tolerance.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* FERTILIZER & SOIL */}
        {tab === 'fertilizer' && (
          <div className="space-y-8">
            <SectionHead small="F" title="Fertilizer & soil pH" sub="Belmont CA tends slightly alkaline; acid-lovers will struggle without help" />

            {/* pH/NPK testing logger */}
            <div className="bg-white border border-stone-300 rounded-sm p-6">
              <div className="display text-2xl mb-3">Soil test results log</div>
              <div className="text-sm text-stone-700 mb-4 max-w-3xl">
                Belmont CA expectation: <span className="font-semibold">pH 7.0–7.8</span> in clay ground (slightly to moderately alkaline). Topsoil bed depends on what was used. Tap water is also alkaline, so soils trend up over time. Concrete features (foundations, walls) leach lime, accelerating alkalinity nearby. Sample 6–12 inches deep; avoid testing within 1 week of fertilizing or heavy watering.
              </div>
              <SoilTestForm zones={SOIL_ZONES} onAdd={addPhReading} />
            </div>

            <div className="space-y-3">
              <div className="display text-2xl">Reading history</div>
              {phReadings.length === 0 && (
                <div className="bg-white border border-stone-300 rounded-sm p-8 text-center text-stone-500 text-sm">
                  No soil tests logged yet. Add your first reading above.
                </div>
              )}
              {SOIL_ZONES.map(zone => {
                const zoneReadings = phReadings.filter(r => r.zone === zone.id);
                if (zoneReadings.length === 0) return null;
                return (
                  <div key={zone.id} className="bg-white border border-stone-300 rounded-sm overflow-hidden">
                    <div className="bg-stone-50 px-4 py-3 border-b border-stone-200">
                      <div className="display text-lg">{zone.label}</div>
                      <div className="text-xs text-stone-600 mt-0.5">{zone.desc}</div>
                    </div>
                    <div className="divide-y divide-stone-100">
                      {zoneReadings.map(r => {
                        const ph = parseFloat(r.ph);
                        const interp = !isNaN(ph) ? interpretPh(ph) : null;
                        const phToneClass = interp?.tone === 'rose' ? 'bg-rose-50 border-rose-200' : interp?.tone === 'amber' ? 'bg-amber-50 border-amber-200' : interp?.tone === 'good' ? 'bg-emerald-50 border-emerald-200' : 'bg-stone-50 border-stone-200';
                        return (
                          <div key={r.id} className="p-4">
                            <div className="flex justify-between items-start gap-4 flex-wrap mb-2">
                              <div className="text-xs uppercase tracking-wider text-stone-500 num">
                                {new Date(r.ts).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </div>
                              <button onClick={() => deletePhReading(r.id)} className="text-stone-400 hover:text-rose-700 transition text-xs">Delete</button>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                              <div>
                                <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-0.5">pH</div>
                                <div className="font-semibold num text-lg">{r.ph || '—'}</div>
                              </div>
                              <div>
                                <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-0.5">N — Nitrogen</div>
                                {r.n ? <span className={`inline-block px-2 py-0.5 text-xs rounded-sm ${NPK_LEVELS.find(l => l.id === r.n)?.color || ''}`}>{NPK_LEVELS.find(l => l.id === r.n)?.label || r.n}</span> : <span className="text-stone-400">—</span>}
                              </div>
                              <div>
                                <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-0.5">P — Phosphorus</div>
                                {r.p ? <span className={`inline-block px-2 py-0.5 text-xs rounded-sm ${NPK_LEVELS.find(l => l.id === r.p)?.color || ''}`}>{NPK_LEVELS.find(l => l.id === r.p)?.label || r.p}</span> : <span className="text-stone-400">—</span>}
                              </div>
                              <div>
                                <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-0.5">K — Potassium</div>
                                {r.k ? <span className={`inline-block px-2 py-0.5 text-xs rounded-sm ${NPK_LEVELS.find(l => l.id === r.k)?.color || ''}`}>{NPK_LEVELS.find(l => l.id === r.k)?.label || r.k}</span> : <span className="text-stone-400">—</span>}
                              </div>
                            </div>
                            {interp && (
                              <div className={`mt-3 p-3 rounded-sm border text-sm ${phToneClass}`}>
                                <div className="text-xs uppercase tracking-wider mb-1 font-semibold">{interp.short} (pH {r.ph})</div>
                                <div>{interp.long}</div>
                              </div>
                            )}
                            {r.notes && (
                              <div className="mt-2 text-xs text-stone-600 italic">{r.notes}</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Plant fertilizer groups */}
            <div>
              <div className="display text-2xl mb-4">Plant fertilizer groups</div>
              <div className="space-y-4">
                {Object.entries(FEED_GROUPS).map(([key, g]) => {
                  const plantsInGroup = plants.filter(p => getFeedGroup(p) === key);
                  if (plantsInGroup.length === 0) return null;
                  return (
                    <div key={key} className={`border-l-4 rounded-sm overflow-hidden ${g.color}`}>
                      <div className="p-5">
                        <div className="flex items-baseline justify-between flex-wrap gap-2">
                          <div className="display text-xl font-medium">{g.label}</div>
                          <div className="text-xs num">{plantsInGroup.length} plant{plantsInGroup.length === 1 ? '' : 's'}</div>
                        </div>
                        <div className="text-sm mt-2">{g.desc}</div>
                        <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
                          <div>
                            <div className="text-xs uppercase tracking-wider mb-1 opacity-70">With your existing toolkit</div>
                            <div>{g.haveProducts}</div>
                          </div>
                          <div>
                            <div className="text-xs uppercase tracking-wider mb-1 opacity-70">Optional upgrade</div>
                            <div>{g.upgradeProducts}</div>
                          </div>
                          <div className="md:col-span-2">
                            <div className="text-xs uppercase tracking-wider mb-1 opacity-70">When</div>
                            <div className="font-medium">{g.schedule}</div>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-current/20">
                          <div className="text-xs uppercase tracking-wider mb-2 opacity-70">Plants in this group</div>
                          <div className="flex flex-wrap gap-1.5">
                            {plantsInGroup.map(p => (
                              <span key={p.id} className="text-xs px-2 py-0.5 bg-white/60 rounded-sm">
                                {p.common.split('—')[0].trim()}{p.common.includes('—') ? ' …' : ''}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SPRING 2026 STATUS BANNER */}
            <div className="bg-rose-50 border-l-4 border-rose-400 rounded-sm p-4 md:p-5">
              <div className="text-xs uppercase tracking-wider mb-2 text-rose-900 font-semibold">Spring 2026 plan — major change</div>
              <div className="display text-lg md:text-xl mb-3 text-rose-900">Skipping outdoor feed this spring</div>
              <div className="text-xs md:text-sm text-rose-900 space-y-2 max-w-3xl">
                <p><span className="font-semibold">Why:</span> Plants have been fertilized 3× since planting (Aug 2025 by landscaper at planting + follow-up, plus Nov 2025). Gardener used a 5-gal bucket method which likely ran 2-4× the intended concentration. Cumulative load is high. Soil reserves should support spring flush without additional input.</p>
                <p><span className="font-semibold">Active this spring (only 2 batches):</span> Indoor MG (Batch 3) + Bone meal for Cassia/Tristaniopsis (Batch 4). Outdoor Batches 1 & 2 are SKIPPED.</p>
                <p><span className="font-semibold">Going forward:</span> Switching to Osmocote 15-9-12 granular (slow-release, 6-month duration). Eliminates concentration errors. You'll do this yourself, not the gardener. See "Going forward" section below.</p>
                <p><span className="font-semibold">Watch through May/June:</span> If standard ornamentals show pale or slow new growth, do a single light Batch 1 in mid-June at <span className="font-semibold">1/4 strength (not 1/2)</span> — half the dose I had in there before.</p>
              </div>
            </div>

            {/* ACTIVE BATCHES THIS SPRING */}
            <div>
              <div className="display text-xl md:text-2xl mb-2">Active this spring (do these)</div>
              <div className="text-xs md:text-sm text-stone-600 mb-4 max-w-3xl">Two batches happening this round — indoor monthly + bone meal one-time for the recently-replanted trees.</div>
              <div className="space-y-4">
                <DosingBatch
                  title="Batch 3 · Indoor MG 1/2 strength"
                  subtitle="All houseplants (continue monthly schedule, Mar–Oct). Indoor plants have isolated nutrient supply; this isn't part of the outdoor over-feeding history."
                  result={calculateDosing(plants, 'indoor-half')}
                  productLabel="MG crystals"
                  productUnit="tsp"
                  mixDescription="1.5 tsp MG crystals per 1 gallon water"
                  liquid={true}
                />
                <DosingBatch
                  title="Batch 4 · Bone meal (one-time)"
                  subtitle="Cassia × 2 + Tristaniopsis × 1 — 2-month replants showing new growth. Light P-bias feed supports root regeneration. These weren't part of the over-feeding history (replanted Feb 2026)."
                  result={calculateDosing(plants, 'bone-meal')}
                  productLabel="bone meal granules"
                  productUnit="cups"
                  mixDescription="1/2 cup per tree, scratched into mound surface around (not against) trunk, watered in. Once-only — no repeat needed this season."
                  liquid={false}
                  accent="amber"
                />
              </div>
            </div>

            {/* SKIPPED BATCHES THIS SPRING */}
            <div>
              <div className="display text-xl md:text-2xl mb-2">Skipped this spring (don't do these)</div>
              <div className="text-xs md:text-sm text-stone-600 mb-4 max-w-3xl">Both outdoor MG batches are skipped due to over-feeding history. Cards shown for reference; these recipes will not be used again — switching to Osmocote going forward.</div>
              <div className="space-y-4">
                <DosingBatch
                  title="Batch 1 · Miracle-Gro 1/2 strength (outdoor)"
                  subtitle="Standard ornamentals + acid lovers — would have been ~50 plants"
                  result={calculateDosing(plants, 'mg-half')}
                  productLabel="MG crystals"
                  productUnit="tsp"
                  mixDescription="1.5 tsp MG crystals per 1 gallon water"
                  liquid={true}
                  skipList={getSkipList(plants, 'mg-half')}
                  skipReason="3× already fertilized since planting; soil has reserves"
                />
                <DosingBatch
                  title="Batch 2 · Miracle-Gro 1/4 strength (Bougainvilleas)"
                  subtitle="Bougainvilleas × 3 — low nitrogen for bloom"
                  result={calculateDosing(plants, 'mg-quarter')}
                  productLabel="MG crystals"
                  productUnit="tsp"
                  mixDescription="3/4 tsp MG crystals per 1 gallon water"
                  liquid={true}
                  skipReason="Bougainvilleas are established; thrive on neglect once rooted"
                />
              </div>
            </div>

            {/* GOING FORWARD — OSMOCOTE PLAN */}
            <div>
              <div className="display text-xl md:text-2xl mb-2">Going forward — Osmocote slow-release</div>
              <div className="text-xs md:text-sm text-stone-600 mb-4 max-w-3xl space-y-2">
                <p>Replacing water-soluble MG with Osmocote Plus 15-9-12 (Outdoor & Indoor formula). Slow-release granular: sprinkle around dripline, scratch into top inch of soil, water in. One application lasts ~6 months. Burn-resistant — concentration errors not possible.</p>
                <p><span className="font-semibold">Buy:</span> Osmocote Plus Outdoor &amp; Indoor 15-9-12, 4-lb container (~$25 at Home Depot, Lowe's, or any nursery). One container ~= 12 cups, covers your full garden once.</p>
                <p><span className="font-semibold">Apply when:</span> Spring 2027 (target: mid-March to mid-April) for outdoor. For indoor, can switch over whenever you finish the current MG box.</p>
              </div>
              <div className="space-y-4">
                <DosingBatch
                  title="Future Batch — Osmocote outdoor"
                  subtitle="Standard ornamentals + acid lovers + Bougainvilleas (at half rate). One application per spring lasts 6 months."
                  result={calculateDosing(plants, 'osmocote')}
                  productLabel="Osmocote 15-9-12 granules"
                  productUnit="cups"
                  mixDescription="Sprinkle around plant dripline, scratch into top inch of soil, water in deeply. Bougainvilleas get HALF the size-based rate — calculation already accounts for this."
                  liquid={false}
                />
                <DosingBatch
                  title="Future Batch — Osmocote indoor"
                  subtitle="Houseplants — replaces monthly liquid MG with single granular dose every 6 months"
                  result={calculateDosing(plants, 'osmocote-indoor')}
                  productLabel="Osmocote 15-9-12 granules"
                  productUnit="cups"
                  mixDescription="1 tbsp per 8-inch pot. Sprinkle on soil surface; will release with each watering. Reapply every 6 months."
                  liquid={false}
                />
              </div>
            </div>

            {/* Optional upgrades — separate section */}
            <div>
              <div className="display text-xl md:text-2xl mb-2">Optional upgrades</div>
              <div className="text-xs md:text-sm text-stone-600 mb-4 max-w-3xl">These products give marginal improvements over the spring feed plan above. Use them only if you want to optimize further.</div>
              <div className="grid md:grid-cols-2 gap-3">
                <DosingBatch
                  title="Bloom booster (Schultz 10-54-10)"
                  subtitle="Bougainvilleas — alternative to MG 1/4 strength, slightly more bloom"
                  result={calculateDosing(plants, 'bloom')}
                  productLabel="Bloom booster crystals"
                  productUnit="tsp"
                  mixDescription="1 tsp bloom booster per 1 gallon water"
                  liquid={true}
                />
                <DosingBatch
                  title="Espoma Holly-Tone · granular"
                  subtitle="Acid lovers — replaces liquid MG with slow-release granules (set-and-forget)"
                  result={calculateDosing(plants, 'holly')}
                  productLabel="Holly-Tone granules"
                  productUnit="cups"
                  mixDescription="Sprinkle around dripline; scratch into top inch of soil; water in"
                  liquid={false}
                />
              </div>
            </div>

            {/* If chlorosis appears */}
            <div className="bg-amber-50 border border-amber-200 rounded-sm p-4 md:p-6">
              <div className="display text-lg md:text-xl mb-2 text-amber-900">If chlorosis appears (yellow-between-veins on new growth)</div>
              <div className="text-xs md:text-sm text-amber-900 max-w-3xl space-y-2">
                <p>At pH 6.5, you don't need preventive iron chelate. But if a specific plant develops interveinal chlorosis (yellow leaf with green veins) — most likely candidates are Gardenia, Azalea, Camellia, both Maples, Loropetalum, Photinia, Leptospermum, Bottlebrush, or Cassia — apply iron chelate as a targeted spot treatment.</p>
                <p><span className="font-semibold">Spot drench recipe:</span> 1 tsp Sprint 138 (FeEDDHA) per 1 gallon water. Apply 1 gallon to a 5-10 gal plant, 1.5 gallons to 15-20 gal, 2 gallons to a small tree. Lasts 2-3 months. Maximum 2x per growing season.</p>
                <p>Skip the whole-garden iron round we used to recommend — your pH doesn't require it.</p>
              </div>
            </div>

            {/* Detailed dosing for Miracle-Gro all-purpose */}
            <div className="bg-white border border-stone-300 rounded-sm p-4 md:p-6">
              <div className="display text-xl md:text-2xl mb-3">Miracle-Gro All Purpose (24-8-16) — exact dosing</div>
              <div className="text-xs md:text-sm text-stone-700 mb-4">Water-soluble blue crystals. Label rate is 1 tbsp / 1 gal water for outdoor plants every 7-14 days. We mix at lower strengths to fit our schedule and avoid overfeeding.</div>
              <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
                <table className="w-full text-xs md:text-sm min-w-[600px]">
                  <thead style={{ background: '#f5f0e6' }} className="text-[10px] md:text-xs uppercase tracking-wider text-stone-700">
                    <tr>
                      <th className="text-left px-3 py-2 font-semibold">Strength</th>
                      <th className="text-left px-3 py-2 font-semibold">Mix</th>
                      <th className="text-left px-3 py-2 font-semibold">Pour per plant</th>
                      <th className="text-left px-3 py-2 font-semibold">Use for</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-stone-200">
                      <td className="px-3 py-2.5 font-semibold">1/2 strength</td>
                      <td className="px-3 py-2.5 num">1.5 tsp / 1 gal water</td>
                      <td className="px-3 py-2.5 num">1-2 cups for 5-10 gal · 2-3 cups for 15-20 gal · 1-2 gal for trees</td>
                      <td className="px-3 py-2.5">Standard ornamentals (Coprosma, Privets, Escallonia, Agapanthus, Eupatorium, Phormium, Loropetalum, Hippeastrum, Euonymus, Iceplant)</td>
                    </tr>
                    <tr className="border-t border-stone-200 bg-stone-50/50">
                      <td className="px-3 py-2.5 font-semibold">1/4 strength</td>
                      <td className="px-3 py-2.5 num">3/4 tsp / 1 gal water</td>
                      <td className="px-3 py-2.5 num">1-2 cups for 5-10 gal · 2-3 cups for 15-20 gal</td>
                      <td className="px-3 py-2.5">Heavy bloomers (Bougainvilleas — limit N to drive bloom). Also acid-lovers when paired with iron chelate.</td>
                    </tr>
                    <tr className="border-t border-stone-200">
                      <td className="px-3 py-2.5 font-semibold">Indoor 1/2 str</td>
                      <td className="px-3 py-2.5 num">1.5 tsp / 1 gal water</td>
                      <td className="px-3 py-2.5 num">Drench-and-drain like normal water</td>
                      <td className="px-3 py-2.5">All indoor plants except Peperomia (use 1/4 strength)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-3 text-xs text-stone-600">
                <span className="font-semibold">Reference:</span> 1 tsp ≈ 5 g · 1 tbsp ≈ 15 g · MG label rate is 1 tbsp/gal so 1.5 tsp/gal = exactly half. One 1.5 lb box (~25 oz) makes ~250 gal of half-strength solution = covers your whole garden 2-3x in a season.
              </div>
            </div>

            {/* Bloom booster dosing for Bougainvilleas */}
            <div className="bg-white border border-stone-300 rounded-sm p-4 md:p-6">
              <div className="display text-xl md:text-2xl mb-3">Bloom booster (low N, high P-K) — for Bougainvilleas</div>
              <div className="text-xs md:text-sm text-stone-700 mb-3 max-w-3xl">
                <span className="font-semibold">Why:</span> Bougainvilleas push leaves over flowers when N is high. Standard 24-8-16 MG works at 1/4 strength but you can do better with a true bloom booster.
              </div>
              <div className="text-xs md:text-sm text-stone-700 mb-4 max-w-3xl">
                <span className="font-semibold">Standard product:</span> Schultz Bloom Plus 10-54-10 (or any high-P, low-N water-soluble). Label rate: 1 tsp per 1 gal water.
              </div>
              <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
                <table className="w-full text-xs md:text-sm min-w-[500px]">
                  <thead style={{ background: '#f5f0e6' }} className="text-[10px] md:text-xs uppercase tracking-wider text-stone-700">
                    <tr>
                      <th className="text-left px-3 py-2 font-semibold">Strength</th>
                      <th className="text-left px-3 py-2 font-semibold">Mix</th>
                      <th className="text-left px-3 py-2 font-semibold">Pour per plant</th>
                      <th className="text-left px-3 py-2 font-semibold">When</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-stone-200">
                      <td className="px-3 py-2.5 font-semibold">Full label rate</td>
                      <td className="px-3 py-2.5 num">1 tsp / 1 gal water</td>
                      <td className="px-3 py-2.5 num">2-3 cups per 15-20 gal Bougainvillea</td>
                      <td className="px-3 py-2.5">March + June + August (3x/yr)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-3 text-xs text-stone-600">
                <span className="font-semibold">Alternative:</span> Skip the upgrade — MG at 1/4 strength (3/4 tsp/gal) works fine. The bloom booster gives ~10-15% more flowering volume; not transformative.
              </div>
            </div>

            {/* Holly-Tone dosing if upgrading */}
            <div className="bg-white border border-stone-300 rounded-sm p-4 md:p-6">
              <div className="display text-xl md:text-2xl mb-3">Espoma Holly-Tone (4-3-4) — optional upgrade for acid-lovers</div>
              <div className="text-xs md:text-sm text-stone-700 mb-3 max-w-3xl">
                <span className="font-semibold">Why:</span> Granular slow-release acid food with sulfur (lowers pH gradually). Replaces MG + iron chelate combo for acid-lovers in one application. Plants are fed for ~3 months from one feed.
              </div>
              <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
                <table className="w-full text-xs md:text-sm min-w-[500px]">
                  <thead style={{ background: '#f5f0e6' }} className="text-[10px] md:text-xs uppercase tracking-wider text-stone-700">
                    <tr>
                      <th className="text-left px-3 py-2 font-semibold">Plant size</th>
                      <th className="text-left px-3 py-2 font-semibold">Apply per plant</th>
                      <th className="text-left px-3 py-2 font-semibold">When</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-stone-200">
                      <td className="px-3 py-2.5 font-semibold">5-10 gal shrub</td>
                      <td className="px-3 py-2.5 num">1/3 cup (~3 tbsp) sprinkled around dripline; scratch into top inch of soil; water in</td>
                      <td className="px-3 py-2.5">Early spring (March) + early fall (September)</td>
                    </tr>
                    <tr className="border-t border-stone-200 bg-stone-50/50">
                      <td className="px-3 py-2.5 font-semibold">15-20 gal shrub</td>
                      <td className="px-3 py-2.5 num">2/3 cup (~6 tbsp)</td>
                      <td className="px-3 py-2.5">Early spring + early fall</td>
                    </tr>
                    <tr className="border-t border-stone-200">
                      <td className="px-3 py-2.5 font-semibold">Small tree</td>
                      <td className="px-3 py-2.5 num">1.5 cups (~24 tbsp)</td>
                      <td className="px-3 py-2.5">Early spring + early fall</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-3 text-xs text-stone-600">
                <span className="font-semibold">Cost:</span> 5 lb bag (~$20) feeds all your acid-lovers for ~2 yrs. <span className="font-semibold">Note:</span> the smell is strong (organic blood meal/feather meal) for first day after application — keep dogs away initially.
              </div>
            </div>

            {/* This month focus */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-sm p-4 md:p-6">
              <div className="display text-lg md:text-xl mb-3 text-emerald-900">{currentMonth} — what to do now</div>
              <div className="space-y-2 text-xs md:text-sm text-emerald-900">
                {currentMonth === 'April' || currentMonth === 'March' ? (
                  <>
                    <div className="bg-white/60 border border-emerald-200 rounded-sm p-3 mb-3">
                      <div className="text-[10px] uppercase tracking-wider mb-1 font-semibold">Soil test results — Apr 2026</div>
                      <div>pH: <span className="font-semibold num">6.5</span> in both yards (slightly acidic — sweet spot for most plants).<br/>NPK: rapid kit shows depleted, but soil received 3× fertilization since planting (Aug + Nov 2025) — kit reading likely a calibration artifact, not real depletion.</div>
                    </div>
                    <div className="bg-rose-50 border border-rose-300 rounded-sm p-3 mb-3">
                      <div className="text-[10px] uppercase tracking-wider mb-1 font-semibold text-rose-900">⊗ Skipping outdoor feed this spring</div>
                      <div className="text-rose-900">Cumulative fertilization is high (3× since planting + likely over-concentrated by gardener using bucket method). Soil reserves should support spring flush. Switching to Osmocote granular going forward — applied by you, not gardener — to eliminate concentration errors.</div>
                    </div>
                    <p className="font-semibold">This spring — only 2 batches happening:</p>
                    <ul className="ml-5 list-disc space-y-1">
                      <li><span className="font-semibold">Batch 3:</span> Indoor MG 1/2 strength — continue/begin monthly schedule (indoor not part of over-feed history)</li>
                      <li><span className="font-semibold">Batch 4:</span> Bone meal one-time to Cassia × 2 + Tristaniopsis × 1 (replanted Feb 2026, new growth confirmed — supports root regeneration; not part of over-feed history)</li>
                    </ul>
                    <p className="pt-2 font-semibold">Skipped — outdoor MG batches:</p>
                    <ul className="ml-5 list-disc space-y-1">
                      <li><span className="font-semibold">Batch 1 outdoor MG:</span> SKIP — soil has reserves from 3× prior fertilization</li>
                      <li><span className="font-semibold">Batch 2 Bougainvilleas:</span> SKIP — established, thrive on neglect</li>
                    </ul>
                    <p className="pt-2 font-semibold">Buy this spring (for next round):</p>
                    <ul className="ml-5 list-disc space-y-1">
                      <li>Bone meal 3-lb bag (~$8) — for Batch 4 this spring + future use</li>
                      <li>Osmocote Plus 15-9-12 Outdoor & Indoor, 4-lb (~$25) — for spring 2027 round; you apply, not gardener</li>
                    </ul>
                    <p className="pt-2"><span className="font-semibold">Watch through May/June for stress symptoms:</span> Pale or slow new growth on standard ornamentals → mild N deficiency emerging; do a single light Batch 1 mid-June at <span className="font-semibold">1/4 strength only</span>. Yellow-between-veins on acid lovers → spot iron drench. Otherwise leave alone.</p>
                  </>
                ) : currentMonth === 'May' ? (
                  <>
                    <p>Spring feed should be done. Indoor plants continue monthly. Watch for chlorosis (yellow-between-veins) on any plant — apply iron chelate spot treatment if symptoms appear.</p>
                    <p>Next major feed: June (mid-summer round, especially for heavy bloomers — Bougainvilleas, Loropetalum, Escallonia, Salvia).</p>
                  </>
                ) : currentMonth === 'June' || currentMonth === 'July' ? (
                  <>
                    <p>Mid-summer feed: light MG 1/2 round for standard ornamentals + acid lovers. Bougainvilleas get MG 1/4. Skip drought natives. Indoor plants continue monthly.</p>
                    <p>Watch for chlorosis on Bottlebrush + Cassia as they push into flower; spot iron chelate if needed.</p>
                  </>
                ) : currentMonth === 'August' || currentMonth === 'September' ? (
                  <p>Last outdoor feed of the year (September is the cutoff). Light application only. Reduce N to encourage hardening before winter. Stop indoor feeding by end of October.</p>
                ) : (
                  <p>No outdoor feeding October–February. Indoor plants stop monthly feed Nov–Feb. Resume in March.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* NOTES */}
        {tab === 'notes' && (
          <div className="space-y-6">
            <SectionHead small="N" title="Garden notes" sub="Observation log — date-stamped" />
            <NoteComposer onAdd={addNote} />
            <div className="space-y-2">
              {notes.length === 0 && (
                <div className="bg-white border border-stone-300 rounded-sm p-8 text-center text-stone-500 text-sm">
                  No notes yet. Use this to log observations, weather events, treatment results, etc.
                </div>
              )}
              {notes.map(n => (
                <div key={n.id} className="bg-white border border-stone-300 rounded-sm p-4 flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-wider text-stone-500 num mb-1">
                      {new Date(n.ts).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
                    </div>
                    <div className="text-sm whitespace-pre-wrap">{n.text}</div>
                  </div>
                  <button onClick={() => deleteNote(n.id)} className="text-stone-400 hover:text-rose-700 transition">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'data' && (
          <DataTab
            exportData={exportData}
            importData={importData}
            stats={{
              plants: plants.length,
              tasks: Object.keys(taskState).length,
              treatments: Object.keys(treatmentState).length,
              notes: notes.length,
              phReadings: phReadings.length,
            }}
          />
        )}

      </div>

      {/* FOOTER */}
      <div className="border-t border-stone-300/70 mt-16" style={{ background: '#f5f0e6' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 text-xs text-stone-600 flex justify-between flex-wrap gap-4">
          <div>Belburn Garden · Belmont, CA</div>
          <div>Data persists across sessions in your browser. Edit freely.</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SUB-COMPONENTS
// ============================================================

function SaveIndicator({ status, lastSaved }) {
  if (status === 'idle' && !lastSaved) {
    return (
      <div className="text-[10px] uppercase tracking-wider text-stone-500 mt-2 num">
        Storage requires published artifact
      </div>
    );
  }
  const formatTime = (date) => {
    if (!date) return '';
    const now = new Date();
    const diff = (now - date) / 1000;
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  };
  let dot, text, color;
  if (status === 'saving') {
    dot = 'bg-amber-500 animate-pulse'; text = 'Saving…'; color = 'text-amber-800';
  } else if (status === 'error') {
    dot = 'bg-rose-600'; text = 'Save failed — publish artifact to enable storage'; color = 'text-rose-800';
  } else {
    dot = 'bg-emerald-600'; text = `Saved ${formatTime(lastSaved)}`; color = 'text-stone-600';
  }
  return (
    <div className={`flex items-center gap-1.5 mt-2 text-[10px] uppercase tracking-wider num ${color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {text}
    </div>
  );
}

function Stat({ num, label, tone = 'default' }) {
  const tones = {
    default: 'text-stone-800',
    rose: 'text-rose-800',
    amber: 'text-amber-800',
  };
  return (
    <div className="text-right">
      <div className={`display text-2xl md:text-4xl num leading-none ${tones[tone]}`}>{num}</div>
      <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-stone-600 mt-1">{label}</div>
    </div>
  );
}

function MiniStat({ num, label, tone }) {
  const tones = {
    emerald: 'text-emerald-800',
    amber: 'text-amber-800',
    rose: 'text-rose-800',
  };
  return (
    <div>
      <div className={`display text-2xl num leading-none ${tones[tone] || 'text-stone-800'}`}>{num}</div>
      <div className="text-[10px] uppercase tracking-wider text-stone-600 mt-0.5">{label}</div>
    </div>
  );
}

function BubblerToggle({ value, onChange, recommended, size = 'md' }) {
  const options = [0, 1, 2, 3];
  const sizes = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs',
  };
  return (
    <div className="inline-flex items-center gap-2">
      <div className="inline-flex border border-stone-300 rounded-sm overflow-hidden bg-white shadow-sm">
        {options.map(n => {
          const selected = value === n;
          const isRec = recommended === n;
          return (
            <button
              key={n}
              onClick={() => onChange(n)}
              className={`${sizes[size]} num font-semibold transition border-r border-stone-300 last:border-r-0 relative ${
                selected
                  ? 'bg-stone-800 text-white'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
              title={isRec ? `Recommended: ${n}` : ''}
            >
              {n}
              {isRec && !selected && (
                <span className="absolute top-0.5 right-0.5 w-1 h-1 bg-emerald-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
      {recommended !== undefined && value !== recommended && (
        <span className="text-[10px] uppercase tracking-wider text-emerald-700">Rec: {recommended}</span>
      )}
    </div>
  );
}

function QtyStepper({ value, onChange, min = 1, max = 50, size = 'md' }) {
  const sz = {
    sm: { btn: 'w-6 h-6 text-xs', input: 'w-10 text-xs px-1 py-0.5' },
    md: { btn: 'w-7 h-7 text-sm', input: 'w-12 text-sm px-1 py-1' },
  }[size] || { btn: 'w-7 h-7 text-sm', input: 'w-12 text-sm px-1 py-1' };
  const adjust = (delta) => {
    const next = Math.min(max, Math.max(min, value + delta));
    onChange(next);
  };
  return (
    <div className="inline-flex items-center gap-1">
      <button
        onClick={() => adjust(-1)}
        disabled={value <= min}
        className={`${sz.btn} rounded-sm border border-stone-300 bg-white hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed text-stone-700 font-semibold`}
      >−</button>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(Math.max(min, Math.min(max, parseInt(e.target.value) || min)))}
        className={`${sz.input} text-center border border-stone-300 rounded-sm bg-white num font-semibold`}
      />
      <button
        onClick={() => adjust(1)}
        disabled={value >= max}
        className={`${sz.btn} rounded-sm border border-stone-300 bg-white hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed text-stone-700 font-semibold`}
      >+</button>
    </div>
  );
}

function FlowToggle({ value, onChange, recommended, size = 'md' }) {
  const options = ['off', 'low', 'med', 'high'];
  const sizes = {
    sm: 'px-1.5 py-0.5 text-[10px]',
    md: 'px-2 py-1 text-[11px]',
  };
  return (
    <div className="inline-flex items-center gap-2">
      <div className="inline-flex border border-stone-300 rounded-sm overflow-hidden bg-white shadow-sm">
        {options.map(o => {
          const selected = value === o;
          const isRec = recommended === o;
          const baseColor = {
            off: selected ? 'bg-stone-700 text-white' : 'text-stone-600 hover:bg-stone-100',
            low: selected ? 'bg-sky-700 text-white' : 'text-sky-800 hover:bg-sky-50',
            med: selected ? 'bg-emerald-700 text-white' : 'text-emerald-800 hover:bg-emerald-50',
            high: selected ? 'bg-amber-700 text-white' : 'text-amber-800 hover:bg-amber-50',
          }[o];
          return (
            <button
              key={o}
              onClick={() => onChange(o)}
              className={`${sizes[size]} font-semibold uppercase tracking-wider transition border-r border-stone-300 last:border-r-0 relative ${baseColor}`}
              title={isRec ? `Recommended: ${o}` : ''}
            >
              {FLOW_LABEL[o]}
              {isRec && !selected && (
                <span className="absolute top-0.5 right-0.5 w-1 h-1 bg-emerald-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
      {recommended !== undefined && value !== recommended && (
        <span className="text-[10px] uppercase tracking-wider text-emerald-700">Rec: {FLOW_LABEL[recommended]}</span>
      )}
    </div>
  );
}

function ScheduleControl({ label, runtime, interval, onChange, plantCount, totalDelivered, maxRuntime }) {
  const cyclesPerWeek = (7 / Math.max(0.5, interval)).toFixed(1);
  const runtimeMax = maxRuntime || 60;
  const atRuntimeCap = maxRuntime && runtime >= maxRuntime;
  const adjust = (key, delta, min, max) => {
    const cur = key === 'runtime' ? runtime : interval;
    const next = Math.min(max, Math.max(min, cur + delta));
    onChange({ [key]: next });
  };
  return (
    <div className="bg-white border border-stone-300 rounded-sm p-4">
      <div className="flex items-baseline justify-between mb-3">
        <div className="display text-lg font-medium">{label}</div>
        <div className="text-xs text-stone-500 num">{plantCount} plant{plantCount === 1 ? '' : 's'}</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-stone-600 mb-1.5">
            Runtime per cycle
            {maxRuntime && <span className="ml-1 text-stone-500 normal-case tracking-normal text-[10px]">(max {maxRuntime})</span>}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => adjust('runtime', -1, 1, runtimeMax)} className="w-7 h-7 rounded-sm border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 font-semibold">−</button>
            <input
              type="number"
              min="1"
              max={runtimeMax}
              value={runtime}
              onChange={e => onChange({ runtime: Math.max(1, Math.min(runtimeMax, parseInt(e.target.value) || 1)) })}
              className={`w-16 px-2 py-1 text-center text-sm border rounded-sm bg-white num font-semibold ${atRuntimeCap ? 'border-amber-400' : 'border-stone-300'}`}
            />
            <button
              onClick={() => adjust('runtime', 1, 1, runtimeMax)}
              disabled={runtime >= runtimeMax}
              className="w-7 h-7 rounded-sm border border-stone-300 bg-white hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed text-stone-700 font-semibold"
            >+</button>
            <span className="text-xs text-stone-500">min</span>
          </div>
          {atRuntimeCap && (
            <div className="text-[10px] text-amber-800 mt-1.5 leading-tight">At cap — water drains beyond {maxRuntime} min. Use shorter intervals to add more water.</div>
          )}
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-stone-600 mb-1.5">Interval</div>
          <div className="flex items-center gap-2">
            <button onClick={() => adjust('interval', -1, 1, 30)} className="w-7 h-7 rounded-sm border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 font-semibold">−</button>
            <input
              type="number"
              min="1"
              max="30"
              value={interval}
              onChange={e => onChange({ interval: Math.max(1, Math.min(30, parseInt(e.target.value) || 1)) })}
              className="w-16 px-2 py-1 text-center text-sm border border-stone-300 rounded-sm bg-white num font-semibold"
            />
            <button onClick={() => adjust('interval', 1, 1, 30)} className="w-7 h-7 rounded-sm border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 font-semibold">+</button>
            <span className="text-xs text-stone-500">days</span>
          </div>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-stone-200 flex justify-between items-baseline text-xs">
        <span className="text-stone-600">= <span className="font-semibold num text-stone-900">{cyclesPerWeek}</span> cycles/week</span>
        {totalDelivered !== undefined && (
          <span className="text-stone-600">Zone total: <span className="font-semibold num text-stone-900">{totalDelivered.toFixed(1)} gal/wk</span></span>
        )}
      </div>
    </div>
  );
}

function LawnWateringSection() {
  const zones = LAWN_DATA.zones.map(computeLawnZone);
  const sys = LAWN_DATA.system;

  const statusColor = (vs) => {
    if (vs < 60) return 'bg-rose-100 text-rose-900 border-rose-300';
    if (vs < 90) return 'bg-amber-100 text-amber-900 border-amber-300';
    if (vs < 130) return 'bg-emerald-100 text-emerald-900 border-emerald-300';
    return 'bg-stone-200 text-stone-700 border-stone-400';
  };

  const duColor = (du) => {
    if (du >= 70) return 'text-emerald-700';
    if (du >= 60) return 'text-amber-700';
    return 'text-rose-700';
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="display text-xl md:text-2xl mb-2">Lawn watering — measured + planned</div>
        <div className="text-xs md:text-sm text-stone-600 mb-4 max-w-3xl">
          Based on catch-can test (4 containers, 13cm × 13cm, 7-min cycle) cross-referenced with Moen Flo whole-house consumption data. Each zone has different characteristics and a tailored schedule. Target: <span className="font-semibold num">{LAWN_TARGET_INCHES_PER_WEEK}"/wk</span> effective (June, Belmont coastal — lower than CIMIS reference due to marine layer + 3" mowing).
        </div>
      </div>

      {/* System characteristics */}
      <div className="bg-stone-50 border border-stone-300 rounded-sm p-4 md:p-5">
        <div className="text-xs uppercase tracking-wider text-stone-500 mb-3">System characteristics</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3 text-xs md:text-sm">
          <div>
            <div className="text-stone-500 text-[10px] uppercase tracking-wider mb-0.5">Grass type</div>
            <div className="font-medium">{sys.grass}</div>
          </div>
          <div>
            <div className="text-stone-500 text-[10px] uppercase tracking-wider mb-0.5">Mowing</div>
            <div className="font-medium">{sys.mowingHeight}</div>
          </div>
          <div>
            <div className="text-stone-500 text-[10px] uppercase tracking-wider mb-0.5">Water time</div>
            <div className="font-medium">{sys.wateringTime}</div>
          </div>
          <div>
            <div className="text-stone-500 text-[10px] uppercase tracking-wider mb-0.5">Pressure</div>
            <div className="font-medium num">{sys.pressureBaseline}/{sys.pressureUnderLoad} PSI</div>
            <div className="text-[10px] text-stone-500">base/load</div>
          </div>
          <div>
            <div className="text-stone-500 text-[10px] uppercase tracking-wider mb-0.5">Cycle time</div>
            <div className="font-medium">{sys.cycleTimeFinding}</div>
          </div>
          <div>
            <div className="text-stone-500 text-[10px] uppercase tracking-wider mb-0.5">Soak</div>
            <div className="font-medium">{sys.soakTime}</div>
          </div>
          <div className="col-span-2">
            <div className="text-stone-500 text-[10px] uppercase tracking-wider mb-0.5">June target</div>
            <div className="font-medium">{sys.seasonNeed}</div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-stone-200 text-[11px] text-stone-600 leading-snug">
          <span className="font-semibold">Rain context:</span> {sys.rainContext}
        </div>
      </div>

      {/* Per-zone deep-dive cards */}
      <div className="space-y-4">
        {zones.map(z => {
          const cs = z.currentSchedule;
          const rs = z.recommendedSchedule;
          const sameSchedule = cs.cycles === rs.cycles && cs.mins === rs.mins && cs.intervalDays === rs.intervalDays;
          return (
            <div key={z.id} className="border border-stone-300 rounded-sm overflow-hidden bg-white">
              <div className="bg-stone-100 px-4 py-3 border-b border-stone-300 flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <div className="display text-lg">{z.label}</div>
                  <div className="text-xs text-stone-600 num">{z.area} sq ft</div>
                </div>
                <div className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm border ${statusColor(z.avgVsTarget)}`}>
                  {z.status === 'structural-limit' ? 'Structural limit · trust the lawn' :
                   z.avgVsTarget < 60 ? `${z.avgVsTarget.toFixed(0)}% of target avg` :
                   z.avgVsTarget < 90 ? `${z.avgVsTarget.toFixed(0)}% avg (under)` :
                   z.avgVsTarget < 130 ? `${z.avgVsTarget.toFixed(0)}% avg (in range)` :
                   `${z.avgVsTarget.toFixed(0)}% avg (over)`}
                </div>
              </div>

              <div className="p-4 md:p-5 space-y-4">
                {/* Catch can readings */}
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-2">Catch can readings (fl oz per 7-min cycle)</div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {z.readings.map((r, i) => (
                      <div key={i} className="bg-stone-100 border border-stone-300 rounded-sm px-2 py-1 text-xs">
                        <span className="num font-semibold">{r}</span>
                        <span className="text-stone-500"> fl oz</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[11px] text-stone-600">
                    Avg: <span className="num font-semibold">{(z.readings.reduce((a,b)=>a+b,0)/z.readings.length).toFixed(2)}</span> · Max: <span className="num font-semibold">{Math.max(...z.readings)}</span> · Min: <span className="num font-semibold">{Math.min(...z.readings)}</span> · DU: <span className={`num font-semibold ${duColor(z.du)}`}>{z.du.toFixed(0)}%</span>
                    <span className="text-stone-500"> {z.du >= 70 ? '(acceptable)' : z.du >= 60 ? '(borderline)' : '(poor)'}</span>
                  </div>
                </div>

                {/* Key metrics grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-stone-200">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-0.5">Moen Flo gross</div>
                    <div className="num font-semibold text-sm">{z.moenFloGross7min} gal/cycle</div>
                    <div className="text-[10px] text-stone-500">at 7-min</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-0.5">Avg to grass</div>
                    <div className="num font-semibold text-sm">{z.avgGalAt7.toFixed(0)} gal/cycle</div>
                    <div className="text-[10px] text-stone-500">at 7-min, depth {z.avgDepth7.toFixed(3)}"</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-0.5">Efficiency</div>
                    <div className={`num font-semibold text-sm ${z.efficiency >= 60 ? 'text-emerald-700' : z.efficiency >= 40 ? 'text-amber-700' : 'text-rose-700'}`}>
                      {z.efficiency.toFixed(0)}%
                    </div>
                    <div className="text-[10px] text-stone-500">grass / consumed</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-0.5">Max-spot depth</div>
                    <div className="num font-semibold text-sm">{z.maxDepth7.toFixed(3)}"</div>
                    <div className="text-[10px] text-stone-500">at 7-min cycle</div>
                  </div>
                </div>

                {/* Current vs recommended schedule */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-stone-200">
                  <div className="bg-stone-50 border border-stone-200 rounded-sm p-3">
                    <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">Current schedule</div>
                    <div className="num font-semibold">{cs.cycles} × {cs.mins} min / every {cs.intervalDays}d</div>
                    <div className="text-[11px] text-stone-600 mt-1">
                      Avg weekly: <span className="num font-semibold">{z.currentWeeklyAvg.toFixed(2)}"</span> (<span className="num">{z.currentWeeklyAvgGal.toFixed(0)} gal</span>)
                    </div>
                  </div>
                  <div className={`border rounded-sm p-3 ${sameSchedule ? 'bg-stone-50 border-stone-200' : 'bg-emerald-50 border-emerald-300'}`}>
                    <div className="text-[10px] uppercase tracking-wider mb-1 font-semibold text-emerald-900">{sameSchedule ? 'No change recommended' : 'Recommended'}</div>
                    <div className="num font-semibold">{rs.cycles} × {rs.mins} min / every {rs.intervalDays}d</div>
                    <div className="text-[11px] text-stone-700 mt-1">
                      Avg: <span className="num font-semibold">{z.recWeeklyAvg.toFixed(2)}"</span> ({z.avgVsTarget.toFixed(0)}% of target) · Max-spot: <span className="num font-semibold">{z.recWeeklyMax.toFixed(2)}"</span> ({z.maxVsTarget.toFixed(0)}%)
                    </div>
                    <div className="text-[10px] text-stone-600 mt-1 num">{z.recWeeklyAvgGal.toFixed(0)} gal/wk gross to lawn</div>
                  </div>
                </div>

                {/* Notes */}
                <div className="pt-3 border-t border-stone-200">
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-2">Notes & findings</div>
                  <ul className="text-xs md:text-sm text-stone-700 space-y-1.5 list-disc ml-5">
                    {z.notes.map((n, i) => <li key={i}>{n}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Monitoring schedule */}
      <div className="bg-amber-50 border border-amber-300 rounded-sm p-4 md:p-5">
        <div className="display text-lg mb-2 text-amber-900">Sunday monitoring (30 sec per zone)</div>
        <div className="text-xs md:text-sm text-amber-900 space-y-2">
          <p>Walk each lawn zone Sunday morning. Look for these signals and adjust the schedule the same day if you see any.</p>
          <table className="w-full text-xs md:text-sm border-collapse mt-2">
            <thead>
              <tr className="border-b border-amber-300 text-left">
                <th className="py-1 pr-3">Signal</th>
                <th className="py-1 pr-3">Meaning</th>
                <th className="py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-amber-200/50">
                <td className="py-1.5 pr-3">Footprints persist 30+ sec</td>
                <td className="py-1.5 pr-3">Mild stress, loss of turgor</td>
                <td className="py-1.5">+1 cycle</td>
              </tr>
              <tr className="border-b border-amber-200/50">
                <td className="py-1.5 pr-3">Bluish-gray tint replacing green</td>
                <td className="py-1.5 pr-3">Drought onset</td>
                <td className="py-1.5">+1 cycle</td>
              </tr>
              <tr className="border-b border-amber-200/50">
                <td className="py-1.5 pr-3">New yellow patches in low-coverage spots</td>
                <td className="py-1.5 pr-3">DU shortfall + insufficient compensation</td>
                <td className="py-1.5">+1 cycle in that zone</td>
              </tr>
              <tr className="border-b border-amber-200/50">
                <td className="py-1.5 pr-3">Existing yellow patches greening up</td>
                <td className="py-1.5 pr-3">Schedule working</td>
                <td className="py-1.5">Hold</td>
              </tr>
              <tr className="border-b border-amber-200/50">
                <td className="py-1.5 pr-3">Lush dark green, mushrooms, sogginess</td>
                <td className="py-1.5 pr-3">Over-watered</td>
                <td className="py-1.5">−1 cycle</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-3">Crisp brown blade tips, patches dying</td>
                <td className="py-1.5 pr-3">Severe under-water</td>
                <td className="py-1.5">+1-2 cycles + hand-water hot spots</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-3 pt-3 border-t border-amber-200 text-xs">
            <span className="font-semibold">Seasonal escalation:</span> ETo peaks ~July-Aug at ~110% of June. Plan to add 1 cycle to backyard + frontyard middle in late July if needed. ETo drops 30-40% by Sept — drop 1 cycle. Mostly off Nov-Feb as rains return.
          </div>
        </div>
      </div>
    </div>
  );
}

function PlanterWateringSection() {
  const zones = PLANTER_DATA.zones.map(computePlanterZone);
  const totalSaved = zones.reduce((s, z) => s + z.waterSavedGalPerWeek, 0);

  return (
    <div className="space-y-5">
      <div>
        <div className="display text-xl md:text-2xl mb-2">Planter watering — measured + planned</div>
        <div className="text-xs md:text-sm text-stone-600 mb-2 max-w-3xl">
          Based on Moen Flo whole-zone consumption + species-derived water needs + soil-specific loss estimates. Each zone has different efficiency due to soil drainage characteristics.
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-sm p-3 text-xs md:text-sm text-amber-900 max-w-3xl">
          <span className="font-semibold">Rachio entry rule:</span> only key the <span className="font-semibold">total minutes per session</span> + <span className="font-semibold">interval days</span> into Rachio. Effective need (gal/wk) is for analysis — do NOT enter it. Rachio doesn't accept gallons and entering 80/100 directly would massively under-water.
        </div>
      </div>

      {/* Per-zone cards */}
      {zones.map(z => {
        const cur = z.currentRachioInput;
        const rec = z.recommendedRachio;
        const overwatering = z.currentVsNeed > 130;
        return (
          <div key={z.id} className="border border-stone-300 rounded-sm overflow-hidden bg-white">
            <div className="bg-stone-100 px-4 py-3 border-b border-stone-300 flex items-center justify-between gap-3 flex-wrap">
              <div>
                <div className="display text-lg">{z.label}</div>
                <div className="text-xs text-stone-600">{z.drainage} · {z.soilType}</div>
              </div>
              <div className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm border ${overwatering ? 'bg-rose-100 text-rose-900 border-rose-300' : 'bg-emerald-100 text-emerald-900 border-emerald-300'}`}>
                {overwatering ? `${z.currentVsNeed.toFixed(0)}% — overwatering` : `${z.currentVsNeed.toFixed(0)}% of need`}
              </div>
            </div>

            <div className="p-4 md:p-5 space-y-4">
              {/* Key metrics grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-0.5">Moen Flo gross</div>
                  <div className="num font-semibold text-sm">{z.grossPerCycle} gal/cycle</div>
                  <div className="text-[10px] text-stone-500">at {z.cycleMins}-min</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-0.5">Efficiency</div>
                  <div className={`num font-semibold text-sm ${z.efficiency >= 70 ? 'text-emerald-700' : 'text-amber-700'}`}>
                    ~{z.efficiency}%
                  </div>
                  <div className="text-[10px] text-stone-500">range {z.efficiencyRange}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-0.5">Effective need</div>
                  <div className="num font-semibold text-sm">{z.effectiveNeed} gal/wk</div>
                  <div className="text-[10px] text-rose-700 font-semibold">⚠ do not key</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-0.5">Mulch</div>
                  <div className="text-[11px] font-medium leading-tight">{z.mulch}</div>
                </div>
              </div>

              {/* Current vs Recommended Rachio inputs — the main event */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-stone-200">
                <div className="bg-stone-50 border border-stone-300 rounded-sm p-3">
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">Current Rachio entry</div>
                  <div className="num font-semibold text-base">{cur.totalMins} min / every {cur.intervalDays}d</div>
                  <div className="text-[11px] text-stone-600 mt-2 leading-snug">
                    <div>~{z.currentCyclesPerSession.toFixed(0)} cycles × {z.cycleMins} min/session</div>
                    <div>Gross: <span className="num font-semibold">{z.currentGrossPerWeek.toFixed(0)} gal/wk</span></div>
                    <div>Effective: <span className="num font-semibold">{z.currentEffectivePerWeek.toFixed(0)} gal/wk</span> ({z.currentVsNeed.toFixed(0)}% of {z.effectiveNeed})</div>
                  </div>
                </div>
                <div className="bg-emerald-50 border-2 border-emerald-400 rounded-sm p-3">
                  <div className="text-[10px] uppercase tracking-wider mb-1 font-semibold text-emerald-900">★ Recommended Rachio entry</div>
                  <div className="num font-bold text-base text-emerald-900">{rec.totalMins} min / every {rec.intervalDays}d</div>
                  <div className="text-[11px] text-stone-700 mt-2 leading-snug">
                    <div>{rec.cycles} cycles × {rec.cycleMins} min/session</div>
                    <div>Gross: <span className="num font-semibold">{z.recGrossPerWeek.toFixed(0)} gal/wk</span></div>
                    <div>Effective: <span className="num font-semibold">{z.recEffectivePerWeek.toFixed(0)} gal/wk</span> ({z.recVsNeed.toFixed(0)}% of {z.effectiveNeed})</div>
                    <div className="text-[10px] text-stone-600 mt-1">Range based on efficiency: {z.recEffLow.toFixed(0)}-{z.recEffHigh.toFixed(0)} gal/wk effective ({z.recVsNeedLow.toFixed(0)}-{z.recVsNeedHigh.toFixed(0)}% of need)</div>
                  </div>
                  <div className="text-[10px] text-emerald-800 font-semibold mt-2 pt-2 border-t border-emerald-200">
                    Saves {z.waterSavedGalPerWeek.toFixed(0)} gal/wk ({z.waterSavedPercent.toFixed(0)}% less)
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="pt-3 border-t border-stone-200">
                <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-2">Notes & findings</div>
                <ul className="text-xs md:text-sm text-stone-700 space-y-1.5 list-disc ml-5">
                  {z.notes.map((n, i) => <li key={i}>{n}</li>)}
                </ul>
              </div>
            </div>
          </div>
        );
      })}

      {/* Total savings summary */}
      <div className="bg-emerald-50 border border-emerald-300 rounded-sm p-4">
        <div className="text-[11px] uppercase tracking-wider text-emerald-900 mb-1 font-semibold">Total estimated savings (planter zones)</div>
        <div className="num font-bold text-lg text-emerald-900">{totalSaved.toFixed(0)} gal/week</div>
        <div className="text-xs text-emerald-800 mt-1">
          ~{Math.round(totalSaved * 52 / 1000)}k gallons/year if applied year-round. Actual annual savings depend on seasonal need changes (drops 40-60% in fall/winter).
        </div>
      </div>

      {/* Monitoring & adjustment protocol */}
      <div className="bg-amber-50 border border-amber-300 rounded-sm p-4 md:p-5">
        <div className="display text-lg mb-2 text-amber-900">Probe-test protocol (2 weeks after switching)</div>
        <div className="text-xs md:text-sm text-amber-900 space-y-2">
          <p>Run the new schedule for 2 weeks. Then probe-test 2 days post-watering at root depth (4-8") in 3-4 spots per zone. Decide based on what you feel:</p>
          <table className="w-full text-xs md:text-sm border-collapse mt-2">
            <thead>
              <tr className="border-b border-amber-300 text-left">
                <th className="py-1 pr-3">Probe result</th>
                <th className="py-1 pr-3">Meaning</th>
                <th className="py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-amber-200/50">
                <td className="py-1.5 pr-3">Moist (dirt sticks to probe)</td>
                <td className="py-1.5 pr-3">Right amount</td>
                <td className="py-1.5">Hold; try Option A (3 cycles backyard) next month</td>
              </tr>
              <tr className="border-b border-amber-200/50">
                <td className="py-1.5 pr-3">Just barely moist (crumbles off)</td>
                <td className="py-1.5 pr-3">Adequate, no buffer</td>
                <td className="py-1.5">Hold</td>
              </tr>
              <tr className="border-b border-amber-200/50">
                <td className="py-1.5 pr-3">Bone dry at 4-8"</td>
                <td className="py-1.5 pr-3">Efficiency lower than 55-78%; under-delivering</td>
                <td className="py-1.5">+1 cycle/session or shorten interval by 1 day</td>
              </tr>
              <tr className="border-b border-amber-200/50">
                <td className="py-1.5 pr-3">Wet/soggy</td>
                <td className="py-1.5 pr-3">Over-watering at new schedule</td>
                <td className="py-1.5">−1 cycle/session</td>
              </tr>
              <tr>
                <td className="py-1.5 pr-3">Patchy (some moist, some dry)</td>
                <td className="py-1.5 pr-3">Lateral distribution issue at specific plants</td>
                <td className="py-1.5">Check individual bubblers; reposition if needed</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-3 pt-3 border-t border-amber-200 text-xs space-y-1">
            <div><span className="font-semibold">Gardenia-specific:</span> while recovering from mealybug damage (4 weeks), supplement with a pint of water at the base 3-4 times per week between irrigation sessions. Hand-water only, not the gardener.</div>
            <div><span className="font-semibold">Sync the app:</span> after Rachio change holds, update the Schedule Control above to match the new runtime/interval so per-plant audit reflects reality.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VeggieWateringSection() {
  const c = VEGGIE_DATA.config;
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const currentMonth = new Date().getMonth();
  const current = computeVeggieZone(currentMonth);
  const totalArea = c.bedCount * c.bedLength * c.bedWidth;
  const activeArea = totalArea * (c.activePercent / 100);

  const allMonths = monthNames.map((name, i) => ({
    name,
    monthIndex: i,
    isCurrent: i === currentMonth,
    ...computeVeggieZone(i),
  }));

  return (
    <div className="space-y-5">
      <div>
        <div className="display text-xl md:text-2xl mb-2">Veggie raised beds — measured + planned</div>
        <div className="text-xs md:text-sm text-stone-600 mb-2 max-w-3xl">
          5 raised beds on a single drip zone. Same schedule covers all beds — set for the highest-need crops in the mix (tomatoes, peppers, squash); lettuce-type beds will get more than needed but tolerate it.
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-sm p-3 text-xs md:text-sm text-amber-900 max-w-3xl">
          <span className="font-semibold">Rachio entry rule:</span> only key the <span className="font-semibold">total minutes per session</span> + <span className="font-semibold">interval days</span>. Effective need (gal/wk) is for analysis only.
        </div>
      </div>

      {/* Configuration card */}
      <div className="bg-stone-50 border border-stone-300 rounded-sm p-4 md:p-5">
        <div className="text-xs uppercase tracking-wider text-stone-500 mb-3">Configuration</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3 text-xs md:text-sm">
          <div>
            <div className="text-stone-500 text-[10px] uppercase tracking-wider mb-0.5">Beds</div>
            <div className="font-medium num">{c.bedCount} × {c.bedLength}' × {c.bedWidth}'</div>
            <div className="text-[10px] text-stone-500">{totalArea} sq ft total</div>
          </div>
          <div>
            <div className="text-stone-500 text-[10px] uppercase tracking-wider mb-0.5">Active area</div>
            <div className="font-medium num">{activeArea} sq ft</div>
            <div className="text-[10px] text-stone-500">{c.activePercent}% planted</div>
          </div>
          <div>
            <div className="text-stone-500 text-[10px] uppercase tracking-wider mb-0.5">Flow rate</div>
            <div className="font-medium num">{c.flowRateGPM.toFixed(2)} GPM</div>
            <div className="text-[10px] text-stone-500">14 gal / 3 min (Rachio)</div>
          </div>
          <div>
            <div className="text-stone-500 text-[10px] uppercase tracking-wider mb-0.5">Drip efficiency</div>
            <div className="font-medium num">~{c.efficiency}%</div>
            <div className="text-[10px] text-stone-500">range {c.efficiencyRange}</div>
          </div>
        </div>
      </div>

      {/* Current month recommendation — prominent */}
      <div className="border-2 border-emerald-400 rounded-sm p-4 md:p-5 bg-emerald-50">
        <div className="text-[10px] uppercase tracking-wider text-emerald-900 mb-1 font-semibold">★ This month ({monthNames[currentMonth]}) — Rachio entry</div>
        <div className="num font-bold text-2xl text-emerald-900 mb-2">{Math.round(current.minutesPerSession)} min / every {Math.round(7 / current.sessionsPerWeek)} days</div>
        <div className="text-xs md:text-sm text-stone-700 space-y-0.5">
          <div>Need: <span className="num font-semibold">{current.needPerWeekIn.toFixed(2)}"/wk</span> effective</div>
          <div>Per week: <span className="num font-semibold">{current.grossGalPerWeek.toFixed(0)} gal gross</span> · <span className="num font-semibold">{current.effectiveGalPerWeek.toFixed(0)} gal effective</span></div>
          <div>Per session: <span className="num font-semibold">{current.grossGalPerSession.toFixed(0)} gal</span> over <span className="num font-semibold">{current.minutesPerSession.toFixed(1)} min</span> (rounded to {Math.round(current.minutesPerSession)})</div>
          <div>Sessions: <span className="num font-semibold">{current.sessionsPerWeek}/wk</span> (e.g., Mon / Wed / Fri)</div>
        </div>
      </div>

      {/* Seasonal table */}
      <div>
        <div className="display text-lg mb-2">Year-round schedule</div>
        <div className="text-xs text-stone-600 mb-3">
          Effective need varies seasonally with ETo. Runtime scales while keeping 3 sessions/wk default. In winter, rain typically covers most need — turn off Rachio Dec-Feb unless dry spell.
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-sm border-collapse">
            <thead>
              <tr className="bg-stone-100 text-left border-b border-stone-300">
                <th className="py-2 px-3 text-[10px] uppercase tracking-wider text-stone-600">Month</th>
                <th className="py-2 px-3 text-[10px] uppercase tracking-wider text-stone-600">Need (in/wk)</th>
                <th className="py-2 px-3 text-[10px] uppercase tracking-wider text-stone-600">Effective (gal/wk)</th>
                <th className="py-2 px-3 text-[10px] uppercase tracking-wider text-stone-600">Gross (gal/wk)</th>
                <th className="py-2 px-3 text-[10px] uppercase tracking-wider text-stone-600">Min/session</th>
                <th className="py-2 px-3 text-[10px] uppercase tracking-wider text-stone-600">Rachio entry</th>
              </tr>
            </thead>
            <tbody>
              {allMonths.map(m => {
                const rachioMin = Math.round(m.minutesPerSession);
                const isWinter = m.monthIndex === 11 || m.monthIndex === 0 || m.monthIndex === 1;
                return (
                  <tr key={m.monthIndex} className={`border-b border-stone-200 ${m.isCurrent ? 'bg-emerald-50' : ''}`}>
                    <td className="py-2 px-3">
                      <div className="font-semibold">{m.name}</div>
                      {m.isCurrent && <div className="text-[10px] text-emerald-700 font-semibold">CURRENT</div>}
                    </td>
                    <td className="py-2 px-3 num">{m.needPerWeekIn.toFixed(2)}"</td>
                    <td className="py-2 px-3 num">{m.effectiveGalPerWeek.toFixed(0)}</td>
                    <td className="py-2 px-3 num">{m.grossGalPerWeek.toFixed(0)}</td>
                    <td className="py-2 px-3 num">{m.minutesPerSession.toFixed(1)}</td>
                    <td className="py-2 px-3 num font-semibold">
                      {isWinter ? (
                        <span className="text-stone-500 text-[11px] italic">rain usually covers</span>
                      ) : (
                        <>{rachioMin} min / every {Math.round(7 / m.sessionsPerWeek)}d</>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes & best practices */}
      <div className="bg-stone-50 border border-stone-300 rounded-sm p-4 md:p-5">
        <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-2">Notes & best practices</div>
        <ul className="text-xs md:text-sm text-stone-700 space-y-1.5 list-disc ml-5">
          <li>Mulch every bed with 2-3" straw or compost (around plants, not touching stems). Cuts evaporation 30-50%; lets you stay at the lower end of the gallon range.</li>
          <li>Hand-check soil moisture 1-2 days after watering at 2-4" depth. Dry = increase runtime; moist = correct; wet = decrease.</li>
          <li>One drip zone for all 5 beds means lettuce-heavy beds get more than they need; tomato-heavy beds get exactly what they need. Plan plant placement accordingly: lettuce/spinach in beds 1-2, tomatoes/peppers in beds 3-5 if possible.</li>
          <li>Newly transplanted seedlings need daily watering for first 1-2 weeks; supplement by hand during establishment.</li>
          <li>In peak summer (Jul-Aug), if soil dries between sessions, shift to <span className="font-semibold">every 2 days strict</span> (3.5 sessions/wk) instead of more minutes per session.</li>
          <li>Winter (Dec-Feb): turn Rachio off unless 2+ weeks pass without rain. Belmont winter rainfall typically covers veggie need.</li>
          <li>If a specific crop shows stress despite schedule, hand-water that crop individually — don't increase the whole zone.</li>
        </ul>
      </div>
    </div>
  );
}

function NavTab({ id, tab, setTab, icon: Icon, children }) {
  const active = tab === id;
  return (
    <button
      onClick={() => setTab(id)}
      className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm font-medium border-b-2 transition whitespace-nowrap ${
        active
          ? 'border-stone-800 text-stone-900'
          : 'border-transparent text-stone-500 hover:text-stone-800'
      }`}
    >
      <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
      {children}
    </button>
  );
}

function SectionHead({ small, title, sub }) {
  return (
    <div className="mb-4 md:mb-5">
      <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-stone-500 num mb-2">{small} · {title}</div>
      <h2 className="display text-2xl md:text-4xl font-medium leading-tight">{title}</h2>
      {sub && <div className="text-xs md:text-sm text-stone-600 mt-2">{sub}</div>}
    </div>
  );
}

function Card({ title, children, tone = 'default' }) {
  const borders = {
    default: 'border-stone-300',
    rose: 'border-rose-300',
    amber: 'border-amber-300',
  };
  const accents = {
    default: 'text-stone-700',
    rose: 'text-rose-800',
    amber: 'text-amber-800',
  };
  return (
    <div className={`bg-white border ${borders[tone]} rounded-sm p-5`}>
      <div className={`text-xs uppercase tracking-[0.2em] mb-3 ${accents[tone]}`}>{title}</div>
      {children}
    </div>
  );
}

function BloomItem({ name, detail, status }) {
  const dot = { now: 'bg-emerald-600', soon: 'bg-amber-600', later: 'bg-stone-400' }[status];
  const label = { now: 'Now', soon: 'Soon', later: 'Later' }[status];
  return (
    <div className="flex items-start gap-3 text-sm py-1">
      <div className={`w-1.5 h-1.5 rounded-full ${dot} mt-2 shrink-0`} />
      <div className="flex-1">
        <span className="font-semibold">{name}</span>
        <span className="text-xs uppercase tracking-wider ml-2 text-stone-500">{label}</span>
        <div className="text-stone-700 text-xs mt-0.5">{detail}</div>
      </div>
    </div>
  );
}

function PlantCard({ plant, expanded, onToggle, onUpdate, isEditing, setEditing }) {
  const Icon = LOC_ICON[plant.loc] || Leaf;
  const m = MATCH_STYLES[plant.match];
  const ws = getWaterSource(plant);
  const q = getQty(plant);

  let waterText;
  if (ws === 'bubbler') {
    waterText = `${plant.bub} bubbler${plant.bub === 1 ? '' : 's'}${plant.bub !== plant.recBub && plant.recBub > 0 ? ` (rec: ${plant.recBub})` : ''}`;
  } else if (ws === 'sprinkler') {
    waterText = 'Lawn sprinkler';
  } else if (ws === 'natural') {
    waterText = 'Self-sustaining';
  } else {
    waterText = 'Hand-watered';
  }

  return (
    <div className={`bg-white border rounded-sm transition ${expanded ? 'border-stone-400 shadow-sm' : 'border-stone-300 hover:border-stone-400'}`}>
      <button onClick={onToggle} className="w-full text-left p-4 flex items-center gap-4">
        <div className={`w-1.5 h-12 rounded-full ${m.dot} shrink-0`} />
        <Icon className="w-5 h-5 text-stone-500 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="display text-lg font-medium leading-tight">
              {plant.common}
              {q > 1 && <span className="text-stone-500 ml-2 text-sm font-normal">×{q}</span>}
            </span>
            <span className="italic text-sm text-stone-500 truncate">{plant.sci}</span>
          </div>
          <div className="text-xs text-stone-600 mt-1 num flex gap-3 flex-wrap">
            <span>{LOC_LABEL[plant.loc]}</span>
            <span>·</span>
            <span>{SIZE_LABEL[plant.size]}</span>
            <span>·</span>
            <span>{waterText}</span>
          </div>
        </div>
        {expanded ? <ChevronDown className="w-5 h-5 text-stone-400" /> : <ChevronRight className="w-5 h-5 text-stone-400" />}
      </button>

      {expanded && (
        <div className="border-t border-stone-200 p-5 bg-stone-50/50">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <Detail label="Sun" value={plant.sun} icon={Sun} />
            <Detail label="Water" value={plant.water} icon={Droplets} />
            <Detail label="Soil" value={plant.soil} icon={Sprout} />
            <Detail label="Bloom" value={plant.bloom} icon={Flower2} />
            <Detail label="Common issues" value={plant.issues} icon={Bug} fullWidth />
            <Detail label="Care" value={plant.care} icon={Wrench} fullWidth />
          </div>

          <div className={`mt-4 p-3 rounded-sm border ${m.bg} ${m.border}`}>
            <div className={`text-xs uppercase tracking-wider mb-1 ${m.text}`}>{m.label} · {SOURCE_LABEL[ws]}{ws === 'bubbler' && plant.flow ? ` · Flow: ${FLOW_LABEL[plant.flow]}` : ''} · Feed: {FEED_GROUPS[getFeedGroup(plant)].label}</div>
            <div className={`text-sm ${m.text}`}>{plant.rationale}</div>
          </div>

          {/* Edit row */}
          <div className="mt-4 pt-4 border-t border-stone-200 flex gap-4 flex-wrap items-end">
            <div>
              <div className="text-xs text-stone-600 mb-1.5">Quantity</div>
              <QtyStepper value={q} onChange={(n) => onUpdate({ qty: n })} />
            </div>
            {ws === 'bubbler' && (
              <div>
                <div className="text-xs text-stone-600 mb-1.5">Bubblers (per plant)</div>
                <BubblerToggle
                  value={plant.bub}
                  onChange={(n) => onUpdate({ bub: n })}
                  recommended={plant.recBub}
                />
              </div>
            )}
            {ws !== 'bubbler' && (
              <div>
                <div className="text-xs text-stone-600 mb-1.5">Water source</div>
                <div className="px-3 py-1.5 text-sm border border-stone-300 rounded-sm bg-stone-100 text-stone-700">
                  {SOURCE_DESC[ws]}
                </div>
              </div>
            )}
            <div>
              <div className="text-xs text-stone-600 mb-1.5">Size</div>
              <select
                value={plant.size}
                onChange={e => onUpdate({ size: e.target.value })}
                className="px-2 py-1 text-sm border border-stone-300 rounded-sm bg-white"
              >
                <option value="5-10gal">5–10 gal</option>
                <option value="15-20gal">15–20 gal</option>
                <option value="small-tree">Small tree</option>
                <option value="big-tree">Big tree</option>
                <option value="pot">Potted</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ label, value, icon: Icon, fullWidth }) {
  return (
    <div className={fullWidth ? 'md:col-span-2' : ''}>
      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-stone-500 mb-1">
        {Icon && <Icon className="w-3 h-3" />}
        {label}
      </div>
      <div className="text-stone-800">{value}</div>
    </div>
  );
}

function TreatmentCard({ treatment, treatmentState, onToggle, plants }) {
  const total = treatment.steps.length;
  const done = treatment.steps.filter(s => treatmentState[s.id]?.done).length;
  const isActive = treatment.severity === 'active';
  const accent = isActive ? 'rose' : 'amber';
  const accentColors = {
    rose: { bg: 'bg-rose-50', border: 'border-rose-300', dot: 'bg-rose-700', text: 'text-rose-900' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-300', dot: 'bg-amber-700', text: 'text-amber-900' },
  };
  const c = accentColors[accent];

  return (
    <div className={`bg-white border-l-4 ${c.border} border-y border-r border-stone-300 rounded-sm overflow-hidden`}>
      <div className={`p-5 ${c.bg}`}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className={`text-xs uppercase tracking-[0.2em] ${c.text} mb-1`}>{isActive ? 'Active' : 'Watch list'}</div>
            <h3 className="display text-2xl font-medium">{treatment.title}</h3>
          </div>
          <div className="text-right">
            <div className="display text-2xl num">{done}<span className="text-stone-400">/{total}</span></div>
            <div className="text-xs uppercase tracking-wider text-stone-600">Steps complete</div>
          </div>
        </div>
        <div className="text-sm text-stone-800 mt-3 max-w-3xl">{treatment.summary}</div>
      </div>

      <div className="p-5 space-y-2">
        {treatment.steps.map((s, i) => {
          const isDone = treatmentState[s.id]?.done;
          return (
            <div key={s.id} className="flex items-start gap-3 py-1">
              <button onClick={() => onToggle(s.id)} className="shrink-0 mt-0.5">
                {isDone
                  ? <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  : <Circle className="w-5 h-5 text-stone-300 hover:text-stone-500" />}
              </button>
              <div className="flex-1">
                <div className={`text-sm ${isDone ? 'text-stone-400 line-through' : 'text-stone-800'}`}>
                  <span className="num text-stone-400 mr-2">{(i+1).toString().padStart(2,'0')}</span>
                  {s.text}
                </div>
                {s.when && <div className="text-xs text-stone-500 ml-7 mt-0.5">When: {s.when}</div>}
                {isDone && treatmentState[s.id]?.ts && (
                  <div className="text-xs text-emerald-700 ml-7 mt-0.5 num">
                    ✓ {new Date(treatmentState[s.id].ts).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MonthCard({ month, current, expanded, onToggle, taskState, toggleTask }) {
  const tasks = MONTHLY_TASKS[month] || [];
  const done = tasks.filter(t => taskState[t.id]?.done).length;

  return (
    <div className={`bg-white border rounded-sm transition ${current ? 'border-emerald-700 ring-1 ring-emerald-700' : 'border-stone-300'}`}>
      <button onClick={onToggle} className="w-full text-left p-4 flex items-center gap-4">
        <div className={`display text-2xl font-medium num shrink-0 ${current ? 'text-emerald-800' : 'text-stone-700'}`}>
          {month}
        </div>
        {current && <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-emerald-700 text-white rounded-full">Current</span>}
        <div className="flex-1" />
        <div className="text-sm text-stone-600 num">
          {done}/{tasks.length}
        </div>
        {expanded ? <ChevronDown className="w-5 h-5 text-stone-400" /> : <ChevronRight className="w-5 h-5 text-stone-400" />}
      </button>

      {expanded && (
        <div className="border-t border-stone-200 p-5 space-y-2">
          {tasks.map(t => (
            <button key={t.id} onClick={() => toggleTask(t.id)} className="flex items-start gap-3 text-left w-full hover:bg-stone-50 -mx-2 px-2 py-1.5 rounded">
              {taskState[t.id]?.done
                ? <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-700 shrink-0" />
                : <Circle className="w-4 h-4 mt-0.5 text-stone-300 shrink-0" />}
              <div className="flex-1 text-sm">
                <span className={`${CAT_STYLES[t.cat].bg} ${CAT_STYLES[t.cat].color} text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider mr-2 font-semibold`}>{CAT_STYLES[t.cat].label}</span>
                <span className={taskState[t.id]?.done ? 'text-stone-400 line-through' : 'text-stone-800'}>{t.text}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SoilTestForm({ zones, onAdd }) {
  const [zone, setZone] = useState(zones[0].id);
  const [ph, setPh] = useState('');
  const [n, setN] = useState('');
  const [p, setP] = useState('');
  const [k, setK] = useState('');
  const [readingNotes, setReadingNotes] = useState('');

  const handleSubmit = () => {
    if (!ph && !n && !p && !k) return;
    onAdd({ zone, ph, n, p, k, notes: readingNotes });
    setPh('');
    setN('');
    setP('');
    setK('');
    setReadingNotes('');
  };

  const npkSelect = (value, setter, label) => (
    <div>
      <div className="text-xs uppercase tracking-wider text-stone-600 mb-1.5">{label}</div>
      <select
        value={value}
        onChange={e => setter(e.target.value)}
        className="w-full px-2 py-1.5 text-sm border border-stone-300 rounded-sm bg-white"
      >
        <option value="">— Select —</option>
        {NPK_LEVELS.map(l => (
          <option key={l.id} value={l.id}>{l.label}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-sm p-4">
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-stone-600 mb-1.5">Zone</div>
          <select
            value={zone}
            onChange={e => setZone(e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-stone-300 rounded-sm bg-white"
          >
            {zones.map(z => (
              <option key={z.id} value={z.id}>{z.label}</option>
            ))}
          </select>
          <div className="text-xs text-stone-500 mt-1">{zones.find(z => z.id === zone)?.desc}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-stone-600 mb-1.5">pH (4.0 – 9.0)</div>
          <input
            type="number"
            step="0.1"
            min="4"
            max="9"
            value={ph}
            onChange={e => setPh(e.target.value)}
            placeholder="e.g. 7.2"
            className="w-full px-2 py-1.5 text-sm border border-stone-300 rounded-sm bg-white num"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {npkSelect(n, setN, 'N — Nitrogen')}
        {npkSelect(p, setP, 'P — Phosphorus')}
        {npkSelect(k, setK, 'K — Potassium')}
      </div>
      <div className="mb-4">
        <div className="text-xs uppercase tracking-wider text-stone-600 mb-1.5">Notes (optional)</div>
        <input
          type="text"
          value={readingNotes}
          onChange={e => setReadingNotes(e.target.value)}
          placeholder="e.g. tested near base of Gardenia, soil was dry"
          className="w-full px-2 py-1.5 text-sm border border-stone-300 rounded-sm bg-white"
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!ph && !n && !p && !k}
          className="px-4 py-1.5 text-sm bg-stone-800 text-white rounded-sm disabled:bg-stone-300 hover:bg-stone-900 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add reading
        </button>
      </div>
    </div>
  );
}

function DosingBatch({ title, subtitle, result, productLabel, productUnit, mixDescription, liquid, accent, skipList, skipReason }) {
  const accentClasses = {
    rose: { border: 'border-rose-200', bg: 'bg-rose-50', text: 'text-rose-900', accent: 'text-rose-800' },
    amber: { border: 'border-amber-200', bg: 'bg-amber-50', text: 'text-amber-900', accent: 'text-amber-800' },
    default: { border: 'border-stone-300', bg: 'bg-white', text: 'text-stone-900', accent: 'text-stone-700' },
  };
  const c = accentClasses[accent] || accentClasses.default;

  if (result.plantCount === 0) {
    return (
      <div className={`border ${c.border} rounded-sm p-4 ${c.bg} opacity-60`}>
        <div className={`text-xs uppercase tracking-wider mb-1 ${c.accent}`}>{title}</div>
        <div className="text-sm text-stone-700">{subtitle}</div>
        <div className="text-xs text-stone-500 mt-2 italic">No plants in this group.</div>
      </div>
    );
  }

  // Format the recipe + total batch
  let totalProductLine, totalSolutionLine, perGallonLine;
  if (liquid) {
    const gal = result.totalGallonsPractical;
    const tsp = gal * (result.totalProductTsp / Math.max(0.001, result.totalGallons));
    const tspRounded = tsp.toFixed(tsp >= 1 ? 1 : 2);
    const tbsp = (tsp / 3).toFixed(1);
    totalSolutionLine = `${gal.toFixed(1)} gallons water`;
    if (tsp >= 3) {
      totalProductLine = `${tbsp} tbsp (${tspRounded} tsp) ${productLabel}`;
    } else {
      totalProductLine = `${tspRounded} tsp ${productLabel}`;
    }
    perGallonLine = mixDescription;
  } else {
    const cups = result.totalCupsPractical;
    totalProductLine = `${cups.toFixed(1)} cups ${productLabel} total`;
    totalSolutionLine = null;
    perGallonLine = mixDescription;
  }

  // Group skip list by reason for cleaner display
  const skipByReason = {};
  if (skipList) {
    skipList.forEach(s => {
      if (!skipByReason[s.reason]) skipByReason[s.reason] = [];
      skipByReason[s.reason].push(s);
    });
  }

  // Group plants in apply list by size for cleaner reading
  const plantsBySize = { '5-10gal': [], '15-20gal': [], 'small-tree': [], 'big-tree': [], 'pot': [] };
  result.plantList.forEach(p => {
    if (plantsBySize[p.size]) plantsBySize[p.size].push(p);
  });

  const sizeLabels = {
    '5-10gal': '5-10 gal shrub',
    '15-20gal': '15-20 gal shrub',
    'small-tree': 'small tree',
    'big-tree': 'big tree',
    'pot': 'potted',
  };

  const formatPourAmount = (p) => {
    if (!liquid) return `${p.perPlantVol.toFixed(2)} cups granules each`;
    if (p.perPlantVol >= 1) return `${p.perPlantVol.toFixed(1)} gal each`;
    return `${(p.perPlantVol * 16).toFixed(1)} cups each`;
  };

  return (
    <div className={`border-l-4 ${c.border} rounded-sm overflow-hidden ${c.bg} ${skipReason ? 'opacity-70' : ''}`}>
      {skipReason && (
        <div className="bg-stone-800 text-white px-4 py-2 text-xs uppercase tracking-wider flex items-center gap-2">
          <span className="font-semibold">⊗ Skip this round</span>
          <span className="font-normal opacity-90 normal-case tracking-normal">— {skipReason}</span>
        </div>
      )}
      <div className="p-4 md:p-5">
        <div className={`text-xs uppercase tracking-wider mb-1 ${c.accent}`}>{title}</div>
        <div className="text-sm text-stone-700 mb-4">{subtitle}</div>

        {/* RECIPE — Mix this */}
        <div className="bg-white border border-stone-300 rounded-sm p-3 mb-4">
          <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-2">{liquid ? 'Mix this' : 'Apply this much'}</div>
          {liquid ? (
            <>
              <div className="display text-base md:text-lg font-medium num leading-tight">
                {totalProductLine}
              </div>
              <div className="display text-base md:text-lg num leading-tight">+ {totalSolutionLine}</div>
              <div className="text-[11px] text-stone-500 mt-2 num">Recipe per gallon: {perGallonLine}. You can mix in smaller batches at the same ratio.</div>
            </>
          ) : (
            <>
              <div className="display text-base md:text-lg font-medium num leading-tight">{totalProductLine}</div>
              <div className="text-[11px] text-stone-500 mt-2">{perGallonLine}</div>
            </>
          )}
        </div>

        {/* APPLY TO list */}
        <div className="mb-4">
          <div className="text-[10px] uppercase tracking-wider text-stone-600 mb-2 font-semibold">
            Apply to ({result.plantCount} plant{result.plantCount === 1 ? '' : 's'})
          </div>
          <div className="space-y-2">
            {Object.entries(plantsBySize).map(([size, list]) => {
              if (list.length === 0) return null;
              return (
                <div key={size}>
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">{sizeLabels[size]}</div>
                  <div className="space-y-0.5 pl-2 border-l border-stone-300">
                    {list.map(p => (
                      <div key={p.id} className="flex justify-between text-xs gap-2">
                        <span className="truncate">
                          {p.name}
                          {p.qty > 1 && <span className="text-stone-500 ml-1">× {p.qty}</span>}
                        </span>
                        <span className="num shrink-0 text-stone-700 font-medium">{formatPourAmount(p)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SKIP list (only for the standard MG batch) */}
        {skipList && skipList.length > 0 && Object.keys(skipByReason).length > 0 && (
          <div className="bg-stone-50 border border-stone-300 rounded-sm p-3">
            <div className="text-[10px] uppercase tracking-wider text-stone-700 mb-2 font-semibold">
              ⚠ Do NOT apply to ({skipList.length} plant{skipList.length === 1 ? '' : 's'})
            </div>
            <div className="space-y-2">
              {Object.entries(skipByReason).map(([reason, list]) => (
                <div key={reason}>
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">
                    {reason === 'drought/native' && 'Drought-tolerant natives & Mediterranean (feeding shortens lifespan)'}
                    {reason === 'newly-planted-2-4wk' && 'Newly planted 2-4 weeks ago — skip first growing season; reassess mid-June for vigorous growth, otherwise first feed April 2027'}
                    {reason === 'bone-meal-batch' && 'Replanted ~2 months ago — get bone meal only (Batch 4) for root regeneration support'}
                    {reason === 'separate batch (1/4 strength)' && 'Separate batch (lower strength — see Bougainvillea card)'}
                    {reason === 'indoor batch' && 'Indoor batch (separate — see indoor card)'}
                  </div>
                  <div className="text-xs text-stone-800 leading-snug">
                    {list.map((s, i) => (
                      <span key={s.id}>
                        {s.name}{s.qty > 1 ? ` × ${s.qty}` : ''}{i < list.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DataTab({ exportData, importData, stats }) {
  const [exportText, setExportText] = useState('');
  const [importText, setImportText] = useState('');
  const [importResult, setImportResult] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExport = () => {
    setExportText(exportData());
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // Fallback: select the textarea
      const ta = document.getElementById('export-textarea');
      if (ta) { ta.select(); document.execCommand('copy'); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    }
  };

  const handleDownload = () => {
    const blob = new Blob([exportText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `belburn-garden-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    setImportResult(null);
    setShowConfirm(true);
  };

  const confirmImport = () => {
    const result = importData(importText);
    setImportResult(result);
    setShowConfirm(false);
    if (result.ok) setImportText('');
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <SectionHead small="D" title="Data export & import" sub="Backup, sync between devices, or share with a future Claude session" />

      {/* Stats */}
      <div className="bg-white border border-stone-300 rounded-sm p-4 md:p-6">
        <div className="text-xs uppercase tracking-wider text-stone-500 mb-3">Currently in storage</div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          <div>
            <div className="display text-2xl num">{stats.plants}</div>
            <div className="text-[10px] uppercase tracking-wider text-stone-600">Plants</div>
          </div>
          <div>
            <div className="display text-2xl num">{stats.tasks}</div>
            <div className="text-[10px] uppercase tracking-wider text-stone-600">Task states</div>
          </div>
          <div>
            <div className="display text-2xl num">{stats.treatments}</div>
            <div className="text-[10px] uppercase tracking-wider text-stone-600">Treatment steps</div>
          </div>
          <div>
            <div className="display text-2xl num">{stats.notes}</div>
            <div className="text-[10px] uppercase tracking-wider text-stone-600">Notes</div>
          </div>
          <div>
            <div className="display text-2xl num">{stats.phReadings}</div>
            <div className="text-[10px] uppercase tracking-wider text-stone-600">pH readings</div>
          </div>
        </div>
      </div>

      {/* Export */}
      <div className="bg-white border border-stone-300 rounded-sm p-4 md:p-6">
        <div className="display text-xl md:text-2xl mb-3">Export</div>
        <div className="text-xs md:text-sm text-stone-700 mb-4 max-w-3xl">
          Generates a JSON snapshot of your garden data — qty, sizes, bubbler counts, flow settings, schedules, task progress, treatments, notes, pH readings. Use this to back up before risky operations, sync to another device, or paste into a new Claude conversation so I can see your current state.
        </div>
        <button
          onClick={handleExport}
          className="px-4 py-2 text-sm bg-stone-800 text-white rounded-sm hover:bg-stone-900 transition"
        >
          Generate export
        </button>

        {exportText && (
          <div className="mt-4 space-y-3">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 text-xs uppercase tracking-wider border border-stone-400 rounded-sm bg-white hover:bg-stone-100 transition"
              >
                {copied ? '✓ Copied' : 'Copy to clipboard'}
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 text-xs uppercase tracking-wider border border-stone-400 rounded-sm bg-white hover:bg-stone-100 transition"
              >
                Download as .json
              </button>
            </div>
            <textarea
              id="export-textarea"
              readOnly
              value={exportText}
              className="w-full h-64 px-3 py-2 text-xs font-mono border border-stone-300 rounded-sm bg-stone-50 num"
              onClick={e => e.target.select()}
            />
          </div>
        )}
      </div>

      {/* Import */}
      <div className="bg-white border border-stone-300 rounded-sm p-4 md:p-6">
        <div className="display text-xl md:text-2xl mb-3">Import</div>
        <div className="text-xs md:text-sm text-stone-700 mb-3 max-w-3xl">
          Paste a previously-exported JSON below. Importing OVERWRITES your current state for any data present in the import — fields not in the import are left alone.
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-sm p-3 mb-4 text-xs text-amber-900 max-w-3xl">
          <span className="font-semibold">Tip:</span> Export your current data first if you might want to roll back. Imports cannot be undone.
        </div>
        <textarea
          value={importText}
          onChange={e => setImportText(e.target.value)}
          placeholder='Paste exported JSON here…'
          className="w-full h-48 px-3 py-2 text-xs font-mono border border-stone-300 rounded-sm bg-white"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={handleImport}
            disabled={!importText.trim()}
            className="px-4 py-2 text-sm bg-stone-800 text-white rounded-sm disabled:bg-stone-300 disabled:cursor-not-allowed hover:bg-stone-900 transition"
          >
            Review & import
          </button>
          {importText && (
            <button
              onClick={() => { setImportText(''); setImportResult(null); }}
              className="px-3 py-2 text-xs uppercase tracking-wider border border-stone-400 rounded-sm bg-white hover:bg-stone-100 transition"
            >
              Clear
            </button>
          )}
        </div>

        {showConfirm && (
          <div className="mt-4 bg-rose-50 border border-rose-300 rounded-sm p-4">
            <div className="text-sm text-rose-900 font-semibold mb-2">Confirm import</div>
            <div className="text-xs text-rose-900 mb-3">This will overwrite your current data for any fields in the JSON. Are you sure?</div>
            <div className="flex gap-2">
              <button
                onClick={confirmImport}
                className="px-4 py-1.5 text-sm bg-rose-700 text-white rounded-sm hover:bg-rose-800 transition"
              >
                Yes, import
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-1.5 text-sm border border-stone-400 rounded-sm bg-white hover:bg-stone-100 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {importResult && (
          <div className={`mt-4 rounded-sm p-4 border ${importResult.ok ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'}`}>
            <div className="text-sm font-semibold mb-1">
              {importResult.ok ? '✓ Import successful' : '✗ Import failed'}
            </div>
            <div className="text-xs">
              {importResult.ok ? `Restored: ${importResult.summary}` : importResult.error}
            </div>
          </div>
        )}
      </div>

      {/* How to use */}
      <div className="bg-stone-100 border border-stone-300 rounded-sm p-4 md:p-6">
        <div className="display text-lg md:text-xl mb-3">How to use this</div>
        <div className="text-xs md:text-sm text-stone-800 space-y-3 max-w-3xl">
          <div>
            <div className="font-semibold mb-1">Sync between web & mobile</div>
            <div>Storage syncs through Anthropic when artifact is published, but if it ever gets out of sync: export from one device, paste into the other.</div>
          </div>
          <div>
            <div className="font-semibold mb-1">Backup before changes</div>
            <div>Before any major operation (new app version, bulk edits, experiments), export and save the JSON somewhere safe. Restore if anything goes wrong.</div>
          </div>
          <div>
            <div className="font-semibold mb-1">Share state with future Claude sessions</div>
            <div>Paste your export at the start of a new conversation. Future Claude can read your actual values (qty, schedules, etc.) and bake them into seed defaults or make recommendations from your real state.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NoteComposer({ onAdd }) {
  const [text, setText] = useState('');
  return (
    <div className="bg-white border border-stone-300 rounded-sm p-4">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Log an observation, treatment result, weather event, plant change…"
        rows={3}
        className="w-full px-3 py-2 text-sm border border-stone-300 rounded-sm bg-stone-50 focus:outline-none focus:border-emerald-700 resize-none"
      />
      <div className="flex justify-end mt-2">
        <button
          onClick={() => { onAdd(text); setText(''); }}
          disabled={!text.trim()}
          className="px-4 py-1.5 text-sm bg-stone-800 text-white rounded-sm disabled:bg-stone-300 hover:bg-stone-900 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add note
        </button>
      </div>
    </div>
  );
}
