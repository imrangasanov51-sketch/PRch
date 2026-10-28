function isPrime(number) {
  if (number < 2) return false;
  if (number === 2) return true;
  if (number % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(number); i += 2) {
    if (number % i === 0) return false;
  }
  return true;
}
function factorial(n) {
  if (n < 0) return -1;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}
function fibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  const result = [0, 1];
  for (let i = 2; i < n; i++) result.push(result[i - 1] + result[i - 2]);
  return result;
}
function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b !== 0) { [a, b] = [b, a % b]; }
  return a;
}
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-zа-яё0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}
function countVowels(str) {
  const vowels = 'аеёиоуыэюяaeiou';
  let count = 0;
  for (const char of str.toLowerCase()) if (vowels.includes(char)) count++;
  return count;
}
function reverseString(str) {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) result += str[i];
  return result;
}
function findLongestWord(sentence) {
  const words = sentence.split(/\s+/);
  let longest = '';
  for (const word of words) if (word.length > longest.length) longest = word;
  return longest;
}
function findMax(arr) {
  if (arr.length === 0) return undefined;
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) if (arr[i] > max) max = arr[i];
  return max;
}
function removeDuplicates(arr) {
  const seen = new Set(); const result = [];
  for (const item of arr) if (!seen.has(item)) { seen.add(item); result.push(item); }
  return result;
}
function bubbleSort(arr) {
  const result = [...arr]; const n = result.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return result;
}
function binarySearch(sortedArr, target) {
  let left = 0, right = sortedArr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (sortedArr[mid] === target) return mid;
    if (sortedArr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
function formatCurrency(amount, currency = '₽') {
  const fixed = Number(amount).toFixed(2);
  const [intPart, decPart] = fixed.split('.');
  const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return formatted + '.' + decPart + ' ' + currency;
}
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function generatePassword(length = 8) {
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  const special = '!@#$%^&*()_+-=[]{}';
  const all = lower + upper + digits + special;
  let password = '';
  password += lower[Math.floor(Math.random() * lower.length)];
  password += upper[Math.floor(Math.random() * upper.length)];
  password += digits[Math.floor(Math.random() * digits.length)];
  password += special[Math.floor(Math.random() * special.length)];
  for (let i = password.length; i < length; i++) password += all[Math.floor(Math.random() * all.length)];
  return password.split('').sort(() => Math.random() - 0.5).join('');
}
