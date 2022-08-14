export default function randomDelayGenerator(base = 75, bias = 20) {
  return base + (Math.random() - 0.5) * bias;
}
