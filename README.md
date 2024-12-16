Code for 9.66 Final Project: Uses Hierarchical Bayes Models for the task of learning and predicting pitches in a baseball game

Models for learning weights:
  - baseline_model.js: includes no hierarchical structure or dependence structure learning
  - hierarchical_model.js: updates the baseline model to include a hierarchical structure but does not include dependence learning

Models for predicting pitches:
  - basic_prediction_model: pitch prediction without conditional dependence structure, uses example data
  - integrated_learn_and_predict_basic_model: combines the learning and prediction basic models
  - combined_conditional_model.js: combines the learning and prediction conditional models
