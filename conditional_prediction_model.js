//Hierarchical Bayesian model for pitcher decision process with conditional dependencies
var pitchTypes = ['Fastball', 'Curveball', 'Changeup', 'Slider'];

//Initial Data structure
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
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 0, strikes: 2, batterHand: 'R', pitch: 'Slider'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 0, strikes: 1, batterHand: 'R', pitch: 'Fastball'},
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 0, strikes: 0, batterHand: 'R', pitch: 'Slider'},
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 3, strikes: 1, batterHand: 'L', pitch: 'Fastball'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 2, strikes: 1, batterHand: 'L', pitch: 'Fastball'},
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 1, strikes: 1, batterHand: 'L', pitch: 'Slider'},
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 1, strikes: 0, batterHand: 'L', pitch: 'Fastball'},
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 0, strikes: 0, batterHand: 'L', pitch: 'Fastball'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 0, strikes: 2, batterHand: 'R', pitch: 'Fastball'},
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 0, strikes: 2, batterHand: 'R', pitch: 'Slider'}
];



var newData = [
    {pitcherId: 'P1', lastPitch: 'Curveball', balls: 0, strikes: 2, batterHand: 'R', pitch: 'Changeup'},
    {pitcherId: 'P1', lastPitch: 'Changeup', balls: 2, strikes: 1, batterHand: 'L', pitch: 'Slider'},
    {pitcherId: 'P2', lastPitch: 'Fastball', balls: 1, strikes: 1, batterHand: 'L', pitch: 'Fastball'},
    {pitcherId: 'P2', lastPitch: 'Slider', balls: 0, strikes: 2, batterHand: 'R', pitch: 'Curveball'}
];

var getPitchIndex = function(pitch) {
    if (pitch === 'Fastball') return 0;
    if (pitch === 'Curveball') return 1;
    if (pitch === 'Changeup') return 2;
    if (pitch === 'Slider') return 3;
    return -1;
};

var runModelWithDependencies = function(observedData, priors) {
    var model = function() {
        // Population level parameters
        var populationParams = {
            distributions: {
                baseline: dirichlet({alpha: Vector(priors.distributions.baseline)}),
                sequence: dirichlet({alpha: Vector(priors.distributions.sequence)}),
                count: dirichlet({alpha: Vector(priors.distributions.count)}),
                handedness: dirichlet({alpha: Vector(priors.distributions.handedness)})
            },
            weights: {
                baseline: beta(priors.weights.baseline.alpha, priors.weights.baseline.beta),
                sequence: beta(priors.weights.sequence.alpha, priors.weights.sequence.beta),
                count: beta(priors.weights.count.alpha, priors.weights.count.beta),
                handedness: beta(priors.weights.handedness.alpha, priors.weights.handedness.beta)
            },
            dependencies: {
                sequence_on_count: beta(2, 2),
                sequence_on_handedness: beta(2, 2),
                count_on_handedness: beta(2, 2),
                handedness_on_sequence: beta(2, 2)
            },
            concentration: gamma(priors.concentration.alpha, priors.concentration.beta)
        };

        var getPitcherParams = mem(function(pid) {
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

            var dependencies = {
                sequence_on_count: beta(populationParams.dependencies.sequence_on_count * populationParams.concentration,
                    (1 - populationParams.dependencies.sequence_on_count) * populationParams.concentration),
                sequence_on_handedness: beta(populationParams.dependencies.sequence_on_handedness * populationParams.concentration,
                    (1 - populationParams.dependencies.sequence_on_handedness) * populationParams.concentration),
                count_on_handedness: beta(populationParams.dependencies.count_on_handedness * populationParams.concentration,
                    (1 - populationParams.dependencies.count_on_handedness) * populationParams.concentration),
                handedness_on_sequence: beta(populationParams.dependencies.handedness_on_sequence * populationParams.concentration,
                    (1 - populationParams.dependencies.handedness_on_sequence) * populationParams.concentration)
            };

            var distributions = {
                baseline: dirichlet({alpha: Vector(priors.distributions.baseline)}),
                sequence: dirichlet({alpha: Vector(priors.distributions.sequence)}),
                count: dirichlet({alpha: Vector(priors.distributions.count)}),
                handedness: dirichlet({alpha: Vector(priors.distributions.handedness)})
            };

            return {weights: weights, distributions: distributions, dependencies: dependencies};
        });

        map(function(obs) {
            var pitcherParams = getPitcherParams(obs.pitcherId);
            var weights = pitcherParams.weights;
            var dists = pitcherParams.distributions;
            var deps = pitcherParams.dependencies;

            var probs0 = weights.baseline * dists.baseline.data[0] +
                weights.sequence * dists.sequence.data[0] +
                weights.count * dists.count.data[0] +
                weights.handedness * dists.handedness.data[0];

            var probs1 = weights.baseline * dists.baseline.data[1] +
                weights.sequence * dists.sequence.data[1] +
                weights.count * dists.count.data[1] +
                weights.handedness * dists.handedness.data[1];

            var probs2 = weights.baseline * dists.baseline.data[2] +
                weights.sequence * dists.sequence.data[2] +
                weights.count * dists.count.data[2] +
                weights.handedness * dists.handedness.data[2];

            var probs3 = weights.baseline * dists.baseline.data[3] +
                weights.sequence * dists.sequence.data[3] +
                weights.count * dists.count.data[3] +
                weights.handedness * dists.handedness.data[3];

            var sumProbs = Math.exp(probs0) + Math.exp(probs1) + Math.exp(probs2) + Math.exp(probs3);

            var normalizedProbs = [
                Math.exp(probs0) / sumProbs,
                Math.exp(probs1) / sumProbs,
                Math.exp(probs2) / sumProbs,
                Math.exp(probs3) / sumProbs
            ];

            observe(Categorical({vs: [0, 1, 2, 3], ps: normalizedProbs}), getPitchIndex(obs.pitch));
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
        burn: 1000,
        model: model
    });
};

// Initialize priors
var initialPriors = {
    distributions: {
        baseline: [2, 2, 2, 2],
        sequence: [2, 2, 2, 2],
        count: [2, 2, 2, 2],
        handedness: [2, 2, 2, 2]
    },
    weights: {
        baseline: {alpha: 2, beta: 2},
        sequence: {alpha: 2, beta: 2},
        count: {alpha: 2, beta: 2},
        handedness: {alpha: 2, beta: 2}
    },
    concentration: {alpha: 2, beta: 2}
};

// Run initial inference
var posteriorDist = runModelWithDependencies(initialData, initialPriors);
var posteriorSamp = sample(posteriorDist);

// Try running with new data
var newPosteriorDist = runModelWithDependencies(newData, initialPriors);
var newPosteriorSamp = sample(newPosteriorDist);

// After getting posterior samples, add this printing section:

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

// Print normalized population level weights
var popNormWeights = normalizeWeights(posteriorSamp.population.weights);
print("\n=== Population Level Normalized Weights ===");
print("Baseline: " + popNormWeights.baseline.toFixed(4));
print("Sequence: " + popNormWeights.sequence.toFixed(4));
print("Count: " + popNormWeights.count.toFixed(4));
print("Handedness: " + popNormWeights.handedness.toFixed(4));
print("Sum: " + (popNormWeights.baseline + popNormWeights.sequence +
    popNormWeights.count + popNormWeights.handedness).toFixed(4));

// Print normalized P1 weights
var p1NormWeights = normalizeWeights(posteriorSamp.P1.weights);
print("\n=== P1 Normalized Weights ===");
print("Baseline: " + p1NormWeights.baseline.toFixed(4));
print("Sequence: " + p1NormWeights.sequence.toFixed(4));
print("Count: " + p1NormWeights.count.toFixed(4));
print("Handedness: " + p1NormWeights.handedness.toFixed(4));
print("Sum: " + (p1NormWeights.baseline + p1NormWeights.sequence +
    p1NormWeights.count + p1NormWeights.handedness).toFixed(4));

// Print normalized P2 weights
var p2NormWeights = normalizeWeights(posteriorSamp.P2.weights);
print("\n=== P2 Normalized Weights ===");
print("Baseline: " + p2NormWeights.baseline.toFixed(4));
print("Sequence: " + p2NormWeights.sequence.toFixed(4));
print("Count: " + p2NormWeights.count.toFixed(4));
print("Handedness: " + p2NormWeights.handedness.toFixed(4));
print("Sum: " + (p2NormWeights.baseline + p2NormWeights.sequence +
    p2NormWeights.count + p2NormWeights.handedness).toFixed(4));