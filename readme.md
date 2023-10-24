## Final Note

This repository is part of my beginnings in programming. The project is full of bad practices and potential bugs without clear readability management.

I have kept this project because it has sentimental value for me. Instead of renewing it I have decided to archive it as a memory

# IMD - Intermodulation

Intermodulation is the [amplitude modulation](https://en.wikipedia.org/wiki/Amplitude_modulation "Amplitude modulation") of [signals](https://en.wikipedia.org/wiki/Signal_(electrical_engineering) "Signal (electrical engineering)") containing two or more different [frequencies](https://en.wikipedia.org/wiki/Frequencies "Frequencies"), caused by [nonlinearities](https://en.wikipedia.org/wiki/Non-linear) or time variance in a system. The intermodulation between frequency components will form additional components at frequencies that are not just at [harmonic](https://en.wikipedia.org/wiki/Harmonic "Harmonic") frequencies ([integer](https://en.wikipedia.org/wiki/Integer "Integer")  [multiples](https://en.wikipedia.org/wiki/Multiple_(mathematics) "Multiple (mathematics)")) of either, like [harmonic distortion](https://en.wikipedia.org/wiki/Harmonic_distortion "Harmonic distortion"), but also at the sum and difference frequencies of the original frequencies and at sums and differences of multiples of those frequencies.
## How to:
Simply select any frequency and you can observe the results with respective errors.

## Issues
  
If you select unordered, for example: F1 and then F3, it will do the calculation with F2 = 0 and as a result you will get NaN.

Only calculates the third harmonic of the mix of two frequencies.

## Credits
MSc. Jenry Balebona, for having assigned and guided me during this project. 

Jesús Sánchez [@frakcool](https://github.com/Frakcool), for helping me solve a bug. 

[StackOverFlow](https://stackoverflow.com/) for references.

And... me.
