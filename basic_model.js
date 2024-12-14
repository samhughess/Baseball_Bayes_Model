var pitchTypes = ['Fastball', 'Curveball', 'Changeup', 'Slider'];

var initialData = [
  {pitcherId: 'P1', lastPitch: 'Fastball', balls: 0, strikes: 1, batterHand: 'R', pitch: 'Curveball'},
  {pitcherId: 'P1', lastPitch: 'Curveball', balls: 1, strikes: 1, batterHand: 'L', pitch: 'Fastball'},
  {pitcherId: 'P2', lastPitch: 'Fastball', balls: 0, strikes: 2, batterHand: 'L', pitch: 'Slider'},
  {pitcherId: 'P2', lastPitch: 'Slider', balls: 1, strikes: 0, batterHand: 'R', pitch: 'Changeup'}
];

// New data to include in the second inference step
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

var runModel = function(observedData, priors) {
  var model = function() {
    var populationParams = {
      distributions: {
        baseline: T.toScalars(dirichlet({alpha: Vector(priors.distributions.baseline)})),
        sequence: T.toScalars(dirichlet({alpha: Vector(priors.distributions.sequence)})),
        count: T.toScalars(dirichlet({alpha: Vector(priors.distributions.count)})),
        handedness: T.toScalars(dirichlet({alpha: Vector(priors.distributions.handedness)}))
      },
      weights: {
        baseline: beta(priors.weights.baseline.alpha, priors.weights.baseline.beta),
        sequence: beta(priors.weights.sequence.alpha, priors.weights.sequence.beta),
        count: beta(priors.weights.count.alpha, priors.weights.count.beta),
        handedness: beta(priors.weights.handedness.alpha, priors.weights.handedness.beta)
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
    samples: 1000,
    burn: 100,
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
var posteriorDist = runModel(initialData, initialPriors);
var posteriorSamp = sample(posteriorDist);

// Print initial results
print("=== Population Level ===");
print("\nPopulation Factor Weights:");
print("Baseline: " + posteriorSamp.population.weights.baseline);
print("Sequence: " + posteriorSamp.population.weights.sequence);
print("Count: " + posteriorSamp.population.weights.count);
print("Handedness: " + posteriorSamp.population.weights.handedness);

print("\n=== Individual Level ===");
print("\nP1 Factor Weights:");
print("Baseline: " + posteriorSamp.P1.weights.baseline);
print("Sequence: " + posteriorSamp.P1.weights.sequence);
print("Count: " + posteriorSamp.P1.weights.count);
print("Handedness: " + posteriorSamp.P1.weights.handedness);

print("\nP2 Factor Weights:");
print("Baseline: " + posteriorSamp.P2.weights.baseline);
print("Sequence: " + posteriorSamp.P2.weights.sequence);
print("Count: " + posteriorSamp.P2.weights.count);
print("Handedness: " + posteriorSamp.P2.weights.handedness);

// Update priors based on posterior
var updatedPriors = {
  distributions: {
    baseline: map(function(v) { return v + 1; }, posteriorSamp.population.distributions.baseline),
    sequence: map(function(v) { return v + 1; }, posteriorSamp.population.distributions.sequence),
    count: map(function(v) { return v + 1; }, posteriorSamp.population.distributions.count),
    handedness: map(function(v) { return v + 1; }, posteriorSamp.population.distributions.handedness)
  },
  weights: {
    baseline: {alpha: posteriorSamp.population.weights.baseline * 10, beta: (1 - posteriorSamp.population.weights.baseline) * 10},
    sequence: {alpha: posteriorSamp.population.weights.sequence * 10, beta: (1 - posteriorSamp.population.weights.sequence) * 10},
    count: {alpha: posteriorSamp.population.weights.count * 10, beta: (1 - posteriorSamp.population.weights.count) * 10},
    handedness: {alpha: posteriorSamp.population.weights.handedness * 10, beta: (1 - posteriorSamp.population.weights.handedness) * 10}
  },
  concentration: {alpha: posteriorSamp.population.concentration * 10, beta: 2}
};

// Bayesian update with new data (if available)
var newPosteriorDist = runModel(newData, updatedPriors);
var newPosteriorSamp = sample(newPosteriorDist);

// New update results
print("\n=== Updated Population Level ===");
print("\nPopulation Factor Weights:");
print("Baseline: " + newPosteriorSamp.population.weights.baseline);
print("Sequence: " + newPosteriorSamp.population.weights.sequence);
print("Count: " + newPosteriorSamp.population.weights.count);
print("Handedness: " + newPosteriorSamp.population.weights.handedness);

print("\n=== Updated Individual Level ===");
print("\nP1 Factor Weights:");
print("Baseline: " + newPosteriorSamp.P1.weights.baseline);
print("Sequence: " + newPosteriorSamp.P1.weights.sequence);
print("Count: " + newPosteriorSamp.P1.weights.count);
print("Handedness: " + newPosteriorSamp.P1.weights.handedness);

print("\nP2 Factor Weights:");
print("Baseline: " + newPosteriorSamp.P2.weights.baseline);
print("Sequence: " + newPosteriorSamp.P2.weights.sequence);
print("Count: " + newPosteriorSamp.P2.weights.count);
print("Handedness: " + newPosteriorSamp.P2.weights.handedness);
