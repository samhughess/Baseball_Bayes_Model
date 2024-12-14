var pitchTypes = ['Fastball', 'Curveball', 'Changeup', 'Slider'];

// Original observations
var initialData = [
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 0, strikes: 1, batterHand: 'R', pitch: 'Curveball'},
    {pitcherId: 'P1', lastPitch: 'Curveball', balls: 1, strikes: 1, batterHand: 'L', pitch: 'Fastball'},
    {pitcherId: 'P2', lastPitch: 'Fastball', balls: 0, strikes: 2, batterHand: 'L', pitch: 'Slider'},
    {pitcherId: 'P2', lastPitch: 'Slider', balls: 1, strikes: 0, batterHand: 'R', pitch: 'Changeup'}
];

// New observations showing strong count dependence
var newData = [
    {pitcherId: 'P1', lastPitch: 'Slider', balls: 3, strikes: 0, batterHand: 'R', pitch: 'Fastball'},
    {pitcherId: 'P1', lastPitch: 'Fastball', balls: 3, strikes: 1, batterHand: 'L', pitch: 'Fastball'},
    {pitcherId: 'P2', lastPitch: 'Changeup', balls: 3, strikes: 0, batterHand: 'R', pitch: 'Fastball'},
    {pitcherId: 'P1', lastPitch: 'Curveball', balls: 0, strikes: 2, batterHand: 'R', pitch: 'Slider'},
    {pitcherId: 'P2', lastPitch: 'Fastball', balls: 0, strikes: 2, batterHand: 'L', pitch: 'Curveball'}
];

var getPitchIndex = function(pitch) {
    if (pitch === 'Fastball') return 0;
    if (pitch === 'Curveball') return 1;
    if (pitch === 'Changeup') return 2;
    if (pitch === 'Slider') return 3;
    return -1;
};

var runModel = function(observedData) {
    var model = function() {
        // Population-level factor weights
        var populationWeights = {
            baseline: beta(2, 2),
            sequence: beta(2, 2),
            count: beta(2, 2),
            handedness: beta(2, 2)
        };

        // Weight concentration parameters (how similar pitchers' weights are)
        var weightConcentrations = {
            baseline: gamma(2, 2),
            sequence: gamma(2, 2),
            count: gamma(2, 2),
            handedness: gamma(2, 2)
        };

        // Distribution concentration parameters
        var distributionConcentrations = {
            baseline: gamma(2, 2),
            sequence: gamma(2, 2),
            count: gamma(2, 2),
            handedness: gamma(2, 2)
        };

        // Population-level distributions
        var populationDists = {
            baseline: T.toScalars(dirichlet({alpha: Vector([2, 2, 2, 2])})),
            sequence: T.toScalars(dirichlet({alpha: Vector([2, 2, 2, 2])})),
            count: T.toScalars(dirichlet({alpha: Vector([2, 2, 2, 2])})),
            handedness: T.toScalars(dirichlet({alpha: Vector([2, 2, 2, 2])}))
        };

        // Pitcher-specific parameters
        var getPitcherParams = mem(function(pid) {
            // Pitcher-specific weights (drawn from population weights)
            var weights = {
                baseline: beta(populationWeights.baseline * weightConcentrations.baseline,
                    (1 - populationWeights.baseline) * weightConcentrations.baseline),
                sequence: beta(populationWeights.sequence * weightConcentrations.sequence,
                    (1 - populationWeights.sequence) * weightConcentrations.sequence),
                count: beta(populationWeights.count * weightConcentrations.count,
                    (1 - populationWeights.count) * weightConcentrations.count),
                handedness: beta(populationWeights.handedness * weightConcentrations.handedness,
                    (1 - populationWeights.handedness) * weightConcentrations.handedness)
            };

            // Pitcher-specific distributions (drawn from population distributions)
            var distributions = {
                baseline: T.toScalars(dirichlet({
                    alpha: Vector(map(function(p) { return p * distributionConcentrations.baseline; },
                        populationDists.baseline))
                })),
                sequence: T.toScalars(dirichlet({
                    alpha: Vector(map(function(p) { return p * distributionConcentrations.sequence; },
                        populationDists.sequence))
                })),
                count: T.toScalars(dirichlet({
                    alpha: Vector(map(function(p) { return p * distributionConcentrations.count; },
                        populationDists.count))
                })),
                handedness: T.toScalars(dirichlet({
                    alpha: Vector(map(function(p) { return p * distributionConcentrations.handedness; },
                        populationDists.handedness))
                }))
            };

            return {weights: weights, distributions: distributions};
        });

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
            populationWeights: populationWeights,
            weightConcentrations: weightConcentrations,
            distributionConcentrations: distributionConcentrations,
            P1: getPitcherParams('P1'),
            P2: getPitcherParams('P2')
        };
    };

    return Infer({
        method: 'MCMC',
        samples: 1000,
        burn: 100,
        model: model
    });
};

// Run model with initial data
var initialDist = runModel(initialData);
var initialSamp = sample(initialDist);

print("Initial Model Results:");
print("\nPopulation-level factor weights:");
print("Baseline: " + initialSamp.populationWeights.baseline);
print("Sequence: " + initialSamp.populationWeights.sequence);
print("Count: " + initialSamp.populationWeights.count);
print("Handedness: " + initialSamp.populationWeights.handedness);

print("\nPitcher P1 weights:");
print("Baseline: " + initialSamp.P1.weights.baseline);
print("Sequence: " + initialSamp.P1.weights.sequence);
print("Count: " + initialSamp.P1.weights.count);
print("Handedness: " + initialSamp.P1.weights.handedness);

// To update with new data, run:
// var fullDist = runModel(initialData.concat(newData));
// Run model with initial data
print("=== INITIAL MODEL (4 observations) ===");
var initialDist = runModel(initialData);
var initialSamp = sample(initialDist);

print("\nPopulation-level factor weights:");
print("Baseline: " + initialSamp.populationWeights.baseline);
print("Sequence: " + initialSamp.populationWeights.sequence);
print("Count: " + initialSamp.populationWeights.count);
print("Handedness: " + initialSamp.populationWeights.handedness);

print("\nPitcher P1 individual weights:");
print("Baseline: " + initialSamp.P1.weights.baseline);
print("Sequence: " + initialSamp.P1.weights.sequence);
print("Count: " + initialSamp.P1.weights.count);
print("Handedness: " + initialSamp.P1.weights.handedness);

// Run updated model with all data
print("\n=== UPDATED MODEL (9 observations) ===");
var fullDist = runModel(initialData.concat(newData));
var fullSamp = sample(fullDist);

print("\nUpdated population-level factor weights:");
print("Baseline: " + fullSamp.populationWeights.baseline);
print("Sequence: " + fullSamp.populationWeights.sequence);
print("Count: " + fullSamp.populationWeights.count);
print("Handedness: " + fullSamp.populationWeights.handedness);

print("\nUpdated P1 individual weights:");
print("Baseline: " + fullSamp.P1.weights.baseline);
print("Sequence: " + fullSamp.P1.weights.sequence);
print("Count: " + fullSamp.P1.weights.count);
print("Handedness: " + fullSamp.P1.weights.handedness);

print("\nWeight Changes:");
print("\nPopulation-level changes:");
print("Baseline: " + (fullSamp.populationWeights.baseline - initialSamp.populationWeights.baseline));
print("Sequence: " + (fullSamp.populationWeights.sequence - initialSamp.populationWeights.sequence));
print("Count: " + (fullSamp.populationWeights.count - initialSamp.populationWeights.count));
print("Handedness: " + (fullSamp.populationWeights.handedness - initialSamp.populationWeights.handedness));

print("\nP1 individual weight changes:");
print("Baseline: " + (fullSamp.P1.weights.baseline - initialSamp.P1.weights.baseline));
print("Sequence: " + (fullSamp.P1.weights.sequence - initialSamp.P1.weights.sequence));
print("Count: " + (fullSamp.P1.weights.count - initialSamp.P1.weights.count));
print("Handedness: " + (fullSamp.P1.weights.handedness - initialSamp.P1.weights.handedness));

// Show concentration parameter changes
print("\nWeight concentration changes (how much pitchers differ from population):");
print("Baseline: " + (fullSamp.weightConcentrations.baseline - initialSamp.weightConcentrations.baseline));
print("Sequence: " + (fullSamp.weightConcentrations.sequence - initialSamp.weightConcentrations.sequence));
print("Count: " + (fullSamp.weightConcentrations.count - initialSamp.weightConcentrations.count));
print("Handedness: " + (fullSamp.weightConcentrations.handedness - initialSamp.weightConcentrations.handedness));