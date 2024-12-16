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
