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
        ? [4, 2, 2, 2]  // vs right-handed batters
        : [2, 2, 3, 3]; // vs left-handed batters
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
            baseline: 0.3,
            sequence: 0.25,
            count: 0.25,
            handedness: 0.2
        },
        distributions: {
            baseline: [0.3, 0.2, 0.25, 0.25],
            sequence: [0.25, 0.25, 0.25, 0.25],
            count: [0.2, 0.3, 0.25, 0.25],
            handedness: [0.25, 0.25, 0.25, 0.25]
        }
    },
    P2: {
        weights: {
            baseline: 0.25,
            sequence: 0.3,
            count: 0.25,
            handedness: 0.2
        },
        distributions: {
            baseline: [0.25, 0.25, 0.25, 0.25],
            sequence: [0.3, 0.2, 0.25, 0.25],
            count: [0.25, 0.25, 0.25, 0.25],
            handedness: [0.25, 0.25, 0.3, 0.2]
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
var testScenario = {
    pitcherId: 'P1',
    lastPitch: 'Fastball',
    balls: 1,
    strikes: 2,
    batterHand: 'R'
};

// Make prediction
var prediction = predictNextPitch(testScenario, mockLearnedParams);

// Print results
print("Scenario:");
print("Pitcher: " + testScenario.pitcherId);
print("Last Pitch: " + testScenario.lastPitch);
print("Count: " + testScenario.balls + "-" + testScenario.strikes);
print("Batter: " + testScenario.batterHand + "\n");

print("Predicted next pitch: " + prediction.pitch);
print("Confidence: " + (prediction.probability * 100).toFixed(1) + "%\n");

print("Final probabilities:");
map(function(i) {
    print(pitchTypes[i] + ": " + (prediction.distributions[i] * 100).toFixed(1) + "%");
}, [0,1,2,3]);