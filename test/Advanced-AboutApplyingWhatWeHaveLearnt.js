describe('지금까지 배운 것들에 관하여', function () {
	it('1000 보다 작은 모든 3 또는 5의 배수의 합을 찾아야합니다.', function () {
		let sum = 0;

		for (var i = 1; i < 1000; i += 1) {
			if (i % 3 === 0 || i % 5 === 0) {
				sum += i;
			}
		}

		expect(sum).toBe(233168);
	});

	it('1000 보다 작은 모든 3 또는 5의 배수의 합을 찾아야합니다.(Array method)', function () {
		let arr = [];

		for (let k = 0; k < 1000; k++) {
			arr[k] = k;
		}
		//let sum = arr.filter(n => n % 3 === 0 || n % 5 === 0).reduce((a,c) => a+c);
		let sum = arr.reduce((a, c) => {
			if (c % 3 === 0 || c % 5 === 0) {
				return a + c;
			}
			return a;
		});
		/* 위의 테스트를 array method reduce를 활용해 바꾸어 보세요*/

		expect(233168).toBe(sum);
	});

	describe('피자들에 관하여', function () {
		let products;

		beforeEach(function () {
			products = [
				{
					name: 'Sonoma',
					ingredients: ['artichoke', 'sundried tomatoes', 'mushrooms'],
					containsNuts: false,
				},
				{
					name: 'Pizza Primavera',
					ingredients: [
						'roma',
						'sundried tomatoes',
						'goats cheese',
						'rosemary',
					],
					containsNuts: false,
				},
				{
					name: 'South Of The Border',
					ingredients: ['black beans', 'jalapenos', 'mushrooms'],
					containsNuts: false,
				},
				{
					name: 'Blue Moon',
					ingredients: ['blue cheese', 'garlic', 'walnuts'],
					containsNuts: true,
				},
				{
					name: 'Taste Of Athens',
					ingredients: ['spinach', 'kalamata olives', 'sesame seeds'],
					containsNuts: true,
				},
			];
		});

		it('견과류나 버섯이 들어가있지 않은 피자를 찾아야합니다.', function () {
			let productsICanEat = [];

			for (let i = 0; i < products.length; i += 1) {
				let hasMushrooms = false;

				if (products[i].containsNuts === false) {
					for (let j = 0; j < products[i].ingredients.length; j += 1) {
						if (products[i].ingredients[j] === 'mushrooms') {
							hasMushrooms = true;
						}
					}

					if (!hasMushrooms) productsICanEat.push(products[i]);
				}
			}

			expect(productsICanEat.length).toBe(1);
		});

		it('견과류나 버섯이 들어가있지 않은 피자를 찾아야합니다.(Array method)', function () {
			let productsICanEat = [];
			/* 위의 테스트를 array method filter를 활용해 바꾸어 보세요*/
			productsICanEat.push(
				products
					.filter((n) => n.containsNuts === false)
					.filter((n) => n.ingredients.filter((n) => n !== 'mushrooms'))
			);
			expect(productsICanEat.length).toBe(1);
		});

		it('위의 피자들을 만드는데 어떤 재료가 얼만큼 쓰였는지 찾아야합니다.', function () {
			let ingredientCount = {}; // ingredientCount는 { "artichoke": 1 "mushrooms": 2 } 와 같은 형태가 될 것입니다.

			for (i = 0; i < products.length; i += 1) {
				for (j = 0; j < products[i].ingredients.length; j += 1) {
					ingredientCount[products[i].ingredients[j]] =
						(ingredientCount[products[i].ingredients[j]] || 0) + 1;
				}
			}

			expect(ingredientCount['mushrooms']).toBe(2);
		});

		it('위의 피자들을 만드는데 어떤 재료가 얼만큼 쓰였는지 찾아야합니다.(Array method)', function () {
			let ingredientCount = {}; // ingredientCount는 { "artichoke": 1 "mushrooms": 2 } 와 같은 형태가 될 것입니다.;

			/* 위의 테스트를 map 과 reduce를 연결해 바꾸어 보세요 */

			products
				.map((obj) => {
					for (i = 0; i < obj['ingredients'].length; i++) {
						if (!ingredientCount.hasOwnProperty(obj['ingredients'][i])) {
							ingredientCount[obj['ingredients'][i]] = 0;
						}
						ingredientCount[obj['ingredients'][i]]++;
					}
					return ingredientCount;
				})
				.reduce((a, c) => a + c.mushrooms, 0);
			expect(ingredientCount['mushrooms']).toBe(2);
		});
	});
	/* UNCOMMENT FOR EXTRA CREDIT */
	it('should find the largest prime factor of a composite number', function (num) {
		if (typeof num !== 'number' || num < 2) {
			return 'Enter a composite integer larger than 1';
		}
		// num보다 작은 Prime factor를 찾아서 (배열에 넣어서 마지막을 출력) 혹은 계속 업데이트

		let largestPrimeFactor = 2;
		let isPrime = function (number) {
			if (isNaN(number) || number < 2) {
				return false;
			}
			for (let i = 2; i <= Math.sqrt(number); i++) {
				if (number % i === 0) {
					return false;
				}
			}
			return true;
		};

		let isLargestPrimeFactor = function (num) {
			for (let i = num; i >= 2; i--) {
				if (isPrime(i)) {
					largestPrimeFactor = i;
				}
			}
			return largestPrimeFactor;
		};

		expect(isLargestPrimeFactor(6)).toBe(100);
	});

	it('should find the largest palindrome made from the product of two 3 digit numbers', function (num1, num2) {
		// 3자릿수 * 3자릿수 = 결과 중에서, 가장 큰 회문(110011)을 찾아 리턴
		if (isNaN(num1) || num1 < 100 || num1 > 999) {
			return 'Enter a 3 digit numbers as parameters for this function';
		}
		if (num2 === undefined) {
			num2 = num1;
		}
		for (let i = num1 * num2; i >= 10000; i++) {
			let tmp = String(i).split('');
			if (
				tmp.length === 6 &&
				tmp[0] === tmp[5] &&
				tmp[1] === tmp[4] &&
				tmp[2] === tmp[3]
			) {
				return i;
			}
			if (tmp.length === 5 && tmp[0] === tmp[4] && tmp[1] === tmp[3]) {
				return i;
			}
		}
		return 'Cannot find the largest palindrome';
	});

	it('should find the smallest number divisible by each of the numbers 1 to 20', function () {
		let tmp = [];
		let result = 1;
		for (let i = 0; i < 20; i++) {
			tmp.push(i + 1);
		}
		let greatestCommonDivisor = function (small, big) {
			if (small > big) {
				[small, big] = [big, small];
			}
			while (small > 0) {
				let remainder = big % small;
				if (remainder === 0) {
					return small;
				}
				big = small;
				small = remainder;
			}
			return small;
		};
		let leastCommonMultiple = function (a, b) {
			return (a * b) / greatestCommonDivisor(a, b);
		};
		for (let i = 1; i < tmp.length; i++) {
			result = leastCommonMultiple(result, tmp[i]);
		}
		return result;
	});

	it('should find the difference between the sum of the squares and the square of the sums', function (num1, num2) {
		// 합의 제곱이 더 크다
		if (
			(typeof num1 !== 'number' ||
				typeof num2 !== 'number' ||
				num1 < 0 ||
				num2 < 0 ||
				isNaN(num1),
			isNaN(num2))
		) {
			return 'Enter two numbers larger than 0';
		}
		if (num2 === undefined) {
			num2 = num1;
		}
		let result = 0;
		num1 === 0 ? (result = num2 * num2) : (result = 0);
		num2 === 0 ? (result = num1 * num1) : (result = 0);

		if (num1 !== 0 && num2 !== 0) {
			result = Math.abs(
				(num1 + num2) * (num1 + num2) - (num1 * num1 + num2 * num2)
			);
		}

		return result;
	});

	it('should find the 10001st prime', function () {
		let findThePrimeNumber = 0;
		let count = 0;
		let i = 1;
		let isPrime = function (number) {
			if (isNaN(number) || number < 2) {
				return false;
			}
			for (let i = 2; i <= Math.sqrt(number); i++) {
				if (number % i === 0) {
					return false;
				}
			}
			return true;
		};

		while (count !== 10001) {
			if (isPrime(i)) {
				findThePrimeNumber = i;
				count++;
			}
			i++;
		}
		return findThePrimeNumber;
	});
});
