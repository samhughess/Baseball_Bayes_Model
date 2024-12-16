var pitchTypes = ['Fastball', 'Curveball', 'Changeup', 'Slider'];

var initialData = [
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 1, strikes: 2, batterHand: 'L', pitch: 'Fastball'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 0, strikes: 2, batterHand: 'L', pitch: 'Slider'},
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 0, strikes: 1, batterHand: 'L', pitch: 'Slider'},
    {pitcherId: 'P1', lastPitch: 'Changeup', balls: 0, strikes: 0, batterHand: 'L', pitch: 'Fastball'},
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 0, strikes: 2, batterHand: 'R', pitch: 'Changeup'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 0, strikes: 1, batterHand: 'R', pitch: 'Fastball'},
    {pitcherId: 'P1', lastPitch: 'Changeup', balls: 0, strikes: 0, batterHand: 'R', pitch: 'Slider'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 1, strikes: 2, batterHand: 'L', pitch: 'Changeup'},
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 1, strikes: 2, batterHand: 'L', pitch: 'Slider'},
    {pitcherId: 'P1', lastPitch: 'Changeup', balls: 1, strikes: 1, batterHand: 'L', pitch: 'Fastball'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 0, strikes: 1, batterHand: 'L', pitch: 'Changeup'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 0, strikes: 0, batterHand: 'L', pitch: 'Slider'},
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 2, strikes: 2, batterHand: 'R', pitch: 'Slider'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 1, strikes: 2, batterHand: 'R', pitch: 'Fastball'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 1, strikes: 1, batterHand: 'R', pitch: 'Slider'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 0, strikes: 1, batterHand: 'R', pitch: 'Slider'},
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 0, strikes: 0, batterHand: 'R', pitch: 'Slider'},
    {pitcherId: 'P1', lastPitch: 'Changeup', balls: 2, strikes: 2, batterHand: 'L', pitch: 'Fastball'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 1, strikes: 2, batterHand: 'L', pitch: 'Changeup'},
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 1, strikes: 1, batterHand: 'L', pitch: 'Slider'},
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 1, strikes: 0, batterHand: 'L', pitch: 'Fastball'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 0, strikes: 0, batterHand: 'L', pitch: 'Fastball'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 0, strikes: 0, batterHand: 'R', pitch: 'Slider'},
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 1, strikes: 2, batterHand: 'L', pitch: 'Slider'},
    {pitcherId: 'P1', lastPitch: 'Changeup', balls: 0, strikes: 2, batterHand: 'L', pitch: 'Fastball'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 0, strikes: 1, batterHand: 'L', pitch: 'Changeup'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 0, strikes: 0, batterHand: 'L', pitch: 'Slider'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 1, strikes: 1, batterHand: 'R', pitch: 'Slider'},
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 1, strikes: 0, batterHand: 'R', pitch: 'Slider'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 0, strikes: 0, batterHand: 'R', pitch: 'Fastball'},
    {pitcherId: 'P1', lastPitch: 'Changeup', balls: 0, strikes: 0, batterHand: 'L', pitch: 'Slider'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 0, strikes: 1, batterHand: 'L', pitch: 'Changeup'},
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 0, strikes: 0, batterHand: 'L', pitch: 'Slider'},
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 2, strikes: 2, batterHand: 'R', pitch: 'Fastball'},
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 1, strikes: 2, batterHand: 'R', pitch: 'Fastball'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 1, strikes: 1, batterHand: 'R', pitch: 'Fastball'},
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 1, strikes: 0, batterHand: 'R', pitch: 'Slider'},
    {pitcherId: 'P1', lastPitch: 'Changeup', balls: 0, strikes: 0, batterHand: 'R', pitch: 'Fastball'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 1, strikes: 2, batterHand: 'L', pitch: 'Changeup'},
];


var getPitchIndex = function(pitch) {
    if (pitch === 'Fastball') return 0;
    if (pitch === 'Curveball') return 1;
    if (pitch === 'Changeup') return 2;
    if (pitch === 'Slider') return 3;
    return -1;
};

var runModel = function(observedData, priors) {
    var model = function() {
        // Population Level Parameters
        var populationParams = {
            // Population pitch selection patterns
            distributions: {
                baseline: T.toScalars(dirichlet({alpha: Vector([2, 2, 2, 2])})),
                sequence: T.toScalars(dirichlet({alpha: Vector([2, 2, 2, 2])})),
                count: T.toScalars(dirichlet({alpha: Vector([2, 2, 2, 2])})),
                handedness: T.toScalars(dirichlet({alpha: Vector([2, 2, 2, 2])}))
            },
            // Population factor weights
            weights: {
                baseline: beta(2, 2),
                sequence: beta(2, 2),
                count: beta(2, 2),
                handedness: beta(2, 2)
            },
            // How much individual pitchers vary from population
            concentration: gamma(2, 2)
        };

        // Individual Pitcher Level
        var getPitcherParams = mem(function(pid) {
            // Draw individual weights from population weights
            var weights = {
                baseline: beta(populationParams.weights.baseline * populationParams.concentration,
                    (1 - populationParams.weights.baseline) * populationParams.concentration),
                sequence: beta(populationParams.weights.sequence * populationParams.concentration,
                    (1 - populationParams.weights.sequence) * populationParams.concentration),
                count: beta(populationParams.weights.count * populationParams.concentration,
                    (1 - populationParams.weights.count) * populationParams.concentration),
                handedness: beta(populationParams.weights.handedness * populationParams.concentration,
                    (1 - populationParams.weights.handedness) * populationParams.concentration)
            };

            // Draw individual distributions from population distributions
            var distributions = {
                baseline: T.toScalars(dirichlet({alpha: Vector(map(
                        function(p) { return p * populationParams.concentration; },
                        populationParams.distributions.baseline
                    ))})),
                sequence: T.toScalars(dirichlet({alpha: Vector(map(
                        function(p) { return p * populationParams.concentration; },
                        populationParams.distributions.sequence
                    ))})),
                count: T.toScalars(dirichlet({alpha: Vector(map(
                        function(p) { return p * populationParams.concentration; },
                        populationParams.distributions.count
                    ))})),
                handedness: T.toScalars(dirichlet({alpha: Vector(map(
                        function(p) { return p * populationParams.concentration; },
                        populationParams.distributions.handedness
                    ))}))
            };

            return {weights: weights, distributions: distributions};
        });

        // Observe data
        map(function(obs) {
            var pitcherParams = getPitcherParams(obs.pitcherId);
            var weights = pitcherParams.weights;
            var dists = pitcherParams.distributions;

            var combinedProbs = map(function(i) {
                return (weights.baseline * dists.baseline[i] +
                        weights.sequence * dists.sequence[i] +
                        weights.count * dists.count[i] +
                        weights.handedness * dists.handedness[i]) /
                    (weights.baseline + weights.sequence +
                        weights.count + weights.handedness);
            }, [0,1,2,3]);

            observe(Categorical({vs: [0,1,2,3], ps: combinedProbs}), getPitchIndex(obs.pitch));
        }, observedData);

        return {
            population: populationParams,
            P1: getPitcherParams('P1'),
            P2: getPitcherParams('P2')
        };
    };

    return Infer({
        method: 'MCMC',
        samples: 10000,
        burn: 100,
        model: model
    });
};

// Run initial inference
var initialDist = runModel(initialData);
var initialSamp = sample(initialDist);

// Helper function to normalize an array of numbers to sum to 1
var normalizeArray = function(arr) {
    var sum = arr.reduce(function(a, b) { return a + b; }, 0);
    return arr.map(function(x) { return x / sum; });
};

// Helper function to normalize weights
var normalizeWeights = function(weights) {
    var sum = weights.baseline + weights.sequence + weights.count + weights.handedness;
    return {
        baseline: weights.baseline / sum,
        sequence: weights.sequence / sum,
        count: weights.count / sum,
        handedness: weights.handedness / sum
    };
};

// Helper function to format probability distribution
var formatDistribution = function(dist) {
    // dist is already an array of scalars
    var normalizedDist = normalizeArray(dist);
    return [
        "Fastball: " + (normalizedDist[0] * 100).toFixed(1) + "%",
        "Curveball: " + (normalizedDist[1] * 100).toFixed(1) + "%",
        "Changeup: " + (normalizedDist[2] * 100).toFixed(1) + "%",
        "Slider: " + (normalizedDist[3] * 100).toFixed(1) + "%"
    ].join(", ");
};

// Normalize and print population level results
var popNormWeights = normalizeWeights(initialSamp.population.weights);
print("=== Population Level ===");
print("\nPopulation Factor Weights (Normalized):");
print("Baseline: " + (popNormWeights.baseline * 100).toFixed(1) + "%");
print("Sequence: " + (popNormWeights.sequence * 100).toFixed(1) + "%");
print("Count: " + (popNormWeights.count * 100).toFixed(1) + "%");
print("Handedness: " + (popNormWeights.handedness * 100).toFixed(1) + "%");

print("\nPopulation Distributions (Normalized):");
print("Baseline: " + initialSamp.population.distributions.baseline);
print("Sequence: " + initialSamp.population.distributions.sequence);
print("Count: " + initialSamp.population.distributions.count);
print("Handedness: " + initialSamp.population.distributions.handedness);

// Normalize and print pitcher P1 results
var p1NormWeights = normalizeWeights(initialSamp.P1.weights);
print("\n=== P1 Level ===");
print("\nP1 Factor Weights (Normalized):");
print("Baseline: " + (p1NormWeights.baseline * 100).toFixed(1) + "%");
print("Sequence: " + (p1NormWeights.sequence * 100).toFixed(1) + "%");
print("Count: " + (p1NormWeights.count * 100).toFixed(1) + "%");
print("Handedness: " + (p1NormWeights.handedness * 100).toFixed(1) + "%");

print("\nP1 Distributions (Normalized):");
print("Baseline: " + initialSamp.P1.distributions.baseline);
print("Sequence: " + initialSamp.P1.distributions.sequence);
print("Count: " + initialSamp.P1.distributions.count);
print("Handedness: " + initialSamp.P1.distributions.handedness);

// Normalize and print pitcher P2 results
var p2NormWeights = normalizeWeights(initialSamp.P2.weights);
print("\n=== P2 Level ===");
print("\nP2 Factor Weights (Normalized):");
print("Baseline: " + (p2NormWeights.baseline * 100).toFixed(1) + "%");
print("Sequence: " + (p2NormWeights.sequence * 100).toFixed(1) + "%");
print("Count: " + (p2NormWeights.count * 100).toFixed(1) + "%");
print("Handedness: " + (p2NormWeights.handedness * 100).toFixed(1) + "%");

print("\nP2 Distributions (Normalized):");
print("Baseline: " + initialSamp.P2.distributions.baseline);
print("Sequence: " + initialSamp.P2.distributions.sequence);
print("Count: " + initialSamp.P2.distributions.count);
print("Handedness: " + initialSamp.P2.distributions.handedness);

//Standalone Prediction Model
// Define pitch types
var pitchTypes = ['Fastball', 'Curveball', 'Changeup', 'Slider'];

// Define sequence effects (from learning model)
var getSequenceEffect = function(lastPitch) {
    return lastPitch === 'Fastball'
        ? [3, 2, 2, 1]  // After fastball
        : [2, 2, 2, 2]; // After other pitches
};

var getHandednessEffect = function(batterHand) {
    return batterHand === 'R'
        ? [2, 2, 2, 4]  // vs right-handed batters
        : [4, 2, 2, 2]; // vs left-handed batters
};

var getCountEffect = function(balls, strikes) {
    return strikes >= 2
        ? [1, 2, 3, 4]  // Two-strike counts
        : [2, 2, 2, 2]; // Other counts
};

// Mock learned parameters (structure matches learning model)
var mockLearnedParams = {
    P1: {
        weights: {
            baseline: p1NormWeights.baseline,
            sequence: p1NormWeights.sequence,
            count: p1NormWeights.count,
            handedness: p1NormWeights.handedness
        },

        distributions: {
            baseline: initialSamp.P1.distributions.baseline,
            sequence: initialSamp.P1.distributions.sequence,
            count: initialSamp.P1.distributions.count,
            handedness: initialSamp.P1.distributions.handedness
        }
    },
    P2: {
        weights: {
            baseline: p2NormWeights.baseline,
            sequence: p2NormWeights.sequence,
            count: p1NormWeights.count,
            handedness: p1NormWeights.handedness
        },
        distributions: {
            baseline: initialSamp.P2.distributions.baseline,
            sequence: initialSamp.P2.distributions.sequence,
            count: initialSamp.P2.distributions.count,
            handedness: initialSamp.P2.distributions.handedness
        }
    }
};

// Normalize array helper function
var normalize = function(arr) {
    var total = sum(arr);
    return map(function(x) { return x / total; }, arr);
};

// Complete prediction model
var predictNextPitch = function(scenario, learnedParams) {
    var pitcherParams = scenario.pitcherId === 'P1' ?
        learnedParams.P1 : learnedParams.P2;

    var weights = pitcherParams.weights;
    var dists = pitcherParams.distributions;

    // Get situational effects
    var sequenceEffect = getSequenceEffect(scenario.lastPitch);
    var handednessEffect = getHandednessEffect(scenario.batterHand);
    var countEffect = getCountEffect(scenario.balls, scenario.strikes);

    // Calculate pitch probabilities
    var probs = map(function(i) {
        // Combine all effects with their respective weights
        var seqWeight = weights.sequence * sequenceEffect[i];
        var handWeight = weights.handedness * handednessEffect[i];
        var countWeight = weights.count * countEffect[i];
        var baseWeight = weights.baseline * dists.baseline[i];

        var totalWeight = weights.sequence + weights.handedness +
            weights.count + weights.baseline;

        return (seqWeight + handWeight + countWeight + baseWeight) / totalWeight;
    }, [0,1,2,3]);

    // Normalize probabilities
    var probs = normalize(probs);

    // Find most likely pitch
    var maxProb = Math.max.apply(null, probs);
    var predictedIndex = probs.indexOf(maxProb);

    return {
        pitch: pitchTypes[predictedIndex],
        probability: maxProb,
        distributions: probs,
        effects: {
            sequence: normalize(sequenceEffect),
            handedness: normalize(handednessEffect),
            count: normalize(countEffect)
        }
    };
};

// Test scenario
var testScenarios = [
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 0, strikes: 2, batterHand: 'R'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 0, strikes: 1, batterHand: 'R'},
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 0, strikes: 0, batterHand: 'R'},
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 3, strikes: 1, batterHand: 'L'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 2, strikes: 1, batterHand: 'L'},
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 1, strikes: 1, batterHand: 'L'},
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 1, strikes: 0, batterHand: 'L'},
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 0, strikes: 0, batterHand: 'L'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 0, strikes: 2, batterHand: 'R'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 0, strikes: 2, batterHand: 'R'}
];

var actualPitches = ['Fastball', 'Slider', 'Slider', 'Fastball', 'Fastball',
    'Slider', 'Fastball', 'Fastball', 'Fastball', 'Slider'];

// Make prediction
map(function(scenario, index) {
    var prediction = predictNextPitch(scenario, mockLearnedParams);

    print("=== Scenario " + " ==="); 
    print("Pitcher: " + scenario.pitcherId);
    print("Last Pitch: " + scenario.lastPitch);
    print("Count: " + scenario.balls + "-" + scenario.strikes);
    print("Batter: " + scenario.batterHand + "\n");

    //print("Predicted next pitch: " + prediction.pitch);
    //print("Confidence: " + (prediction.probability * 100).toFixed(1) + "%\n");

    print("Final probabilities:");
    map(function(i) {
        print(pitchTypes[i] + ": " + (prediction.distributions[i] * 100).toFixed(1) + "%");
    }, [0,1,2,3]);

    print("\n---------------------------------\n");
}, testScenarios, [0,1,2,3,4,5,6,7,8.9]);