import { Base64 } from 'js-base64';
import { types } from './constant';

export function getBaseUrlIcons(fill) {
  return type => {
    const types = {
      'accountMobile': `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1527735344111" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2793" xmlns:xlink="http://www.w3.org/1999/xlink" width="48" height="48"><path d="M776.226133 0H246.9888C195.413333 0 153.6 44.305067 153.6 98.952533v824.593067c0 54.647467 41.813333 98.986667 93.3888 98.986667h529.237333c51.575467 0 93.3888-44.3392 93.3888-98.986667V98.986667C869.614933 44.305067 827.8016 0 776.226133 0zM268.8 56.081067h485.649067c34.372267 0 62.2592 29.525333 62.2592 65.9456v30.788266H206.506667v-30.788266c0-36.420267 27.886933-65.9456 62.293333-65.9456z m547.908267 154.282666v504.4224H206.506667V210.397867h610.2016z m-62.2592 756.053334H268.8c-34.4064 0-62.293333-29.525333-62.293333-65.9456v-128.068267h610.2016v128.068267c0 36.420267-27.886933 65.979733-62.2592 65.979733z" p-id="2794" fill="${fill}"></path><path d="M460.8 872.7552c0 13.994667 5.461333 27.921067 14.813867 37.853867 9.352533 9.898667 22.493867 15.701333 35.7376 15.701333 13.2096 0 26.350933-5.802667 35.7376-15.701333a55.876267 55.876267 0 0 0 0-75.707734c-9.386667-9.9328-22.528-15.701333-35.7376-15.701333-13.243733 0-26.385067 5.768533-35.7376 15.701333-9.352533 9.898667-14.813867 23.825067-14.813867 37.853867z" p-id="2795" fill="${fill}"></path></svg>`,
      'accountEmail': `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="48px" height="48.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="${fill}" d="M847.476434 176.523566l-670.953892 0c-61.755567 0-111.82599 50.071446-111.82599 111.82599l0 447.302936c0 61.754544 50.070422 111.82599 111.82599 111.82599l670.953892 0c61.755567 0 111.82599-50.072469 111.82599-111.82599L959.302424 288.349555C959.303448 226.593988 909.232002 176.523566 847.476434 176.523566zM847.476434 232.436049c9.679463 0 18.792014 2.47538 26.743111 6.823413l-362.164798 323.30266-362.207777-323.342569c7.933701-4.324496 17.023739-6.784527 26.675573-6.784527L847.476434 232.435025zM903.389941 735.651468c0 30.837363-25.09047 55.91453-55.913507 55.91453l-670.953892 0c-30.823037 0-55.912483-25.077167-55.912483-55.91453L120.610059 288.349555c0-0.165776 0.011256-0.326435 0.01228-0.490164l391.432408 349.407227 391.325984-349.313083c0 0.134053 0.00921 0.26299 0.00921 0.39602L903.389941 735.651468z" /></svg>`,
      'cardNumber': `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1527735421266" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4518" xmlns:xlink="http://www.w3.org/1999/xlink" width="48" height="48"><path d="M792.607444 823.369563 239.123634 823.369563c-50.946322 0-92.245937-41.299615-92.245937-92.249007L146.877697 316.010257c0-50.946322 41.299615-92.245937 92.245937-92.245937l553.48381 0c50.941206 0 92.245937 41.299615 92.245937 92.245937l0 415.110299C884.852358 782.069949 843.54865 823.369563 792.607444 823.369563M239.123634 777.24506l553.48381 0c25.471115 0 46.12041-20.651342 46.12041-46.124504L838.727855 408.259264l-645.726677 0 0 322.861292c0 25.474185 20.650319 46.124504 46.124504 46.124504L239.123634 777.24506zM792.607444 269.88473 239.123634 269.88473c-25.471115 0-46.121434 20.650319-46.121434 46.125527l0 46.124504 645.726677 0L838.728878 316.010257C838.727855 290.535049 818.081629 269.88473 792.607444 269.88473M262.187933 546.629705l230.615355 0c12.735046 0 23.064298 10.321066 23.064298 23.060205 0 12.735046-10.329253 23.064298-23.064298 23.064298L262.187933 592.754209c-12.740162 0-23.064298-10.329253-23.064298-23.064298C239.123634 556.950771 249.44777 546.629705 262.187933 546.629705M262.187933 638.873596l184.494944 0c12.735046 0 23.060205 10.32209 23.060205 23.060205 0 12.736069-10.32516 23.064298-23.060205 23.064298L262.187933 684.998099c-12.740162 0-23.064298-10.328229-23.064298-23.064298C239.123634 649.195685 249.44777 638.873596 262.187933 638.873596M585.052295 546.629705l46.12041 0c12.735046 0 23.064298 10.321066 23.064298 23.060205 0 12.735046-10.329253 23.064298-23.064298 23.064298l-46.12041 0c-12.743232 0-23.064298-10.329253-23.064298-23.064298C561.986973 556.950771 572.308039 546.629705 585.052295 546.629705" p-id="4519" fill="${fill}"></path></svg>`,
      'idNumber': `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1527735446866" viewBox="0 0 1417 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5305" xmlns:xlink="http://www.w3.org/1999/xlink" width="66.421875" height="48"><path d="M1053.926 141.211h-798.626c-62.983 0.064-114.023 51.105-114.087 114.082v513.408c0.064 62.983 51.105 114.023 114.083 114.087h798.632c62.983-0.064 114.024-51.105 114.087-114.082v-513.408c-0.064-62.983-51.105-114.023-114.082-114.087zM1110.965 768.702c-0.041 31.491-25.558 57.008-57.045 57.050h-798.62c-31.487-0.047-56.998-25.562-57.038-57.045v-513.405c0.040-31.491 25.558-57.008 57.045-57.049h798.62c31.487 0.047 56.998 25.562 57.039 57.045z" p-id="5306" fill="${fill}"></path><path d="M946.142 534.59c30.804-26.183 50.735-64.688 50.735-108.152 0-78.633-63.979-142.613-142.613-142.613s-142.601 63.98-142.601 142.613c0 43.464 19.961 81.969 50.766 108.152-63.939 33.32-107.813 100.123-107.813 177.071 0 15.753 12.772 28.524 28.524 28.524 15.753 0 28.524-12.772 28.524-28.524 0-78.633 63.98-142.612 142.612-142.612s142.613 63.979 142.613 142.612c0 0 0 0 0 0 0 15.753 12.772 28.524 28.524 28.524 15.753 0 28.524-12.772 28.524-28.524 0 0 0 0 0 0-0.009-76.948-43.854-143.752-107.795-177.071zM768.702 426.437c0-47.257 38.308-85.563 85.564-85.563s85.563 38.308 85.563 85.563c0 47.257-38.308 85.563-85.563 85.563-47.234-0.052-85.51-38.33-85.563-85.559zM626.087 340.863h-342.264c-15.753 0-28.524 12.772-28.524 28.524s12.772 28.524 28.524 28.524h342.264c15.753 0 28.524-12.772 28.524-28.524s-12.772-28.524-28.524-28.524zM597.563 483.476h-313.74c-15.753 0-28.524 12.772-28.524 28.524s12.772 28.524 28.524 28.524h313.74c15.753 0 28.524-12.772 28.524-28.524s-12.772-28.524-28.524-28.524zM512 626.087h-228.176c-15.753 0-28.524 12.772-28.524 28.524s12.772 28.524 28.524 28.524h228.176c15.753 0 28.524-12.772 28.524-28.524s-12.772-28.524-28.524-28.524z" p-id="5307" fill="${fill}"></path></svg>`,
      'ipAddress': `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1527735662604" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7433" xmlns:xlink="http://www.w3.org/1999/xlink" width="48" height="48"><path fill="${fill}" d="M511.1 48.8c-209.9 0-380 170.1-380 380s380 550 380 550 380-340.1 380-550-170.1-380-380-380z m0 849s-324-290.1-324-469 145.1-324 324-324 324 145.1 324 324-324 469-324 469z" p-id="7434"></path><path fill="${fill}" d="M448.3 629h-58.4V291h58.4v338zM592.7 510.7h-43V629h-56.8V291h104.5c62.5 2.1 94.7 37.9 96.8 107.5-0.1 74.8-33.9 112.2-101.5 112.2z m-4.6-159.8h-38.4v101.4h38.4c29.7-1 45.1-17.9 46.1-50.7-1-32.7-16.4-49.6-46.1-50.7z" p-id="7435"></path></svg>`,
      'deviceId': `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1527739765356" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9021" xmlns:xlink="http://www.w3.org/1999/xlink" width="48" height="48"><path d="M846.954667 135.125333H166.933333a66.325333 66.325333 0 0 0-66.496 66.496v494.997334a66.304 66.304 0 0 0 66.496 66.496H481.28v62.144H257.258667c-13.738667 0-25.301333 11.562667-25.301334 25.301333s11.562667 25.301333 25.301334 25.301333h499.370666c13.717333 0 25.301333-11.562667 25.301334-25.301333s-11.584-25.301333-25.301334-25.301333H532.586667v-62.144h314.368a66.304 66.304 0 0 0 66.474666-66.496V201.621333a66.346667 66.346667 0 0 0-66.474666-66.496z m15.872 560.789334a16.021333 16.021333 0 0 1-15.872 15.893333H166.933333a16.042667 16.042667 0 0 1-15.914666-15.893333V201.621333c0-8.682667 7.232-15.914667 15.914666-15.914666h680.021334c8.661333 0 15.872 7.232 15.872 15.914666v494.293334z" p-id="9022" fill="${fill}"></path></svg>`,
      'qqNumber': `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1527734119968" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1917" xmlns:xlink="http://www.w3.org/1999/xlink" width="48" height="48"><path d="M686.09209205 1001.7032445c-62.12587025 0-119.70026809-16.06612155-156.67666059-43.53627412-12.17835749 0.68214473-22.91983244 0.68214473-34.93226282 0-36.97639248 27.47015258-94.53235397 43.53627414-156.712381 43.53627412-117.1203322 0-202.18447124-52.49057598-202.18447125-124.72993319 0-35.09818992 20.65446666-66.63931773 57.68616818-89.17083468-0.589963-0.92181719-1.16033741-1.7503004-1.69614363-2.61565629-21.66616105 15.8621695-45.71061046 20.35833288-67.81809149 12.91350671-65.97560936-22.38402619-69.56839187-137.64343992-39.48258301-234.64626399 16.1398669-51.84415166 45.85810123-92.5055084 70.69185661-119.49631603-0.31341784-3.48216447-0.42288363-6.92745625-0.42288363-10.35431172 0-28.04052698 7.31461949-55.41965013 21.68574963-81.39645885v-1.16033739c0-187.11276002 150.72517826-339.40387525 335.97817211-339.40387525 185.23340521 0 335.90327442 152.29111524 335.90327441 339.40387525v0.35029053c14.72026843 26.16232445 22.14550597 53.77881553 22.14550597 82.20765797 0 3.81401866-0.11177032 7.4436739-0.40559955 11.16551087 24.48576941 26.8433169 53.88943357 67.19125578 69.88180974 118.64939647 30.12268159 97.03854448 26.52989904 212.29795821-39.51945569 234.68313666-22.07176061 7.49783065-45.967567 2.94751049-67.57957127-12.7683205-0.60839934 0.86535589-1.14305333 1.7503004-1.75030043 2.56149956 36.8669267 22.64213499 57.46377978 54.01848797 57.46377977 89.07865297 0.00115225 72.23820497-85.06183448 124.72878094-202.25591206 124.7287809z m-148.73520539-93.57481634a24.81416679 24.81416679 0 0 1 16.19402367 5.98835498c27.21204377 23.49020682 77.98803974 38.06298449 132.54118172 38.06298453 84.23335129 0 152.73358749-33.6970278 152.73358749-75.20645636 0-21.94155393-19.82483119-42.83454079-54.38721487-57.26097997-7.14984466-2.94866278-12.51021169-9.1386653-14.40800283-16.58233918a24.67013285 24.67013285 0 0 1 4.42126573-21.51982257 317.80108915 317.80108915 0 0 0 30.73108095-47.20164977c3.92463672-7.2581582 11.12863817-12.19679384 19.27174087-13.00684071 8.42080013-0.92066495 16.34151443 2.35869974 21.63044061 8.75150206 9.67216701 11.51580139 25.14832552 25.53548874 38.30265697 21.07735029 25.25894358-8.64088398 34.56353596-87.77197707 8.01404829-173.111509-14.86660689-47.97597623-44.21726659-84.93393235-66.25215451-107.46660156a24.58371247 24.58371247 0 0 1-6.72465648-21.37117954c0.90338085-5.47328962 1.30782814-10.55711149 1.30782814-15.67895831 0-21.51982254-6.28218423-42.70663865-18.71865052-62.97163754-2.63409266-4.29451587-3.96035715-9.37949002-3.59278254-14.50018457 0.11061808-1.7503004 0.16592708-3.33467373 0.16592708-5.08612641 0-159.88227988-128.45177014-289.88155068-286.37979757-289.88155068-157.94761603 0-286.45469522 129.99927079-286.4546952 289.88155068 0 1.89779117 0.12790212 3.83245502 0.23852019 5.65650079 0.35029054 5.13913088-0.84691956 10.20682095-3.55590984 14.61080264-12.17835749 20.06335139-18.36835999 41.010495-18.36836001 62.29064509 0 4.88217434 0.42288363 9.91183945 1.27095545 15.14430433 1.19836237 7.7386554-1.3262645 15.62364928-6.79840185 21.16953203-22.25612405 22.73431673-51.97435832 59.93194532-66.97117192 108.20290305-26.47459003 85.33953194-17.17114991 164.46947273 8.10623001 173.01817501 13.35713124 4.69781092 28.74110805-9.57998526 38.46973635-21.22484106 5.26933758-6.28218423 13.26494952-9.63529431 21.61085199-8.71462935 8.1431027 0.82963548 15.43928583 5.76711886 19.27174085 13.00684069a312.02359984 312.02359984 0 0 0 30.73108096 47.25811109c4.75311995 6.13469348 6.37436594 14.13030542 4.38554531 21.57397932-1.93581614 7.49783065-7.27774681 13.63367639-14.40800284 16.54431421-34.7110267 14.40800286-54.62688733 35.33671014-54.62688731 57.39003439 0 41.50942856 68.48179986 75.20645634 152.66099436 75.20645635 54.62573506 0 105.40288331-14.57277767 132.65179979-38.06413676 4.93748338-4.29221134 11.21966761-6.52185669 18.05609441-5.93189371 16.63534366 1.29054409 29.97519082 1.29054409 47.07259538 0 0.589963-0.05300449 1.19836237-0.05300449 1.80676172-0.05300448z" p-id="1918" fill="${fill}"></path></svg>`,
      'selected': `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1533284685754" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1049" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14"><path d="M517.12 998.4c-268.8 0-486.4-217.6-486.4-486.4S248.32 25.6 517.12 25.6s486.4 217.6 486.4 486.4-217.6 486.4-486.4 486.4z m0-907.776c-232.96 0-421.376 188.928-421.376 421.376s188.928 421.376 421.376 421.376 421.376-188.928 421.376-421.376c0-232.96-188.416-421.376-421.376-421.376z m-273.92 445.44l31.232-45.568L419.84 595.456l340.992-280.576 30.208 23.552-371.712 371.2-176.128-173.568z" fill="${fill}" p-id="1050"></path></svg>`,
      'locked': `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1533693611321" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2170" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14"><path d="M868.935 1008.63h-713.868c-40.657 0-72.291-31.631-72.291-67.773v-496.994c0-36.144 31.631-67.773 72.291-67.773h713.868c40.657 0 72.291 31.631 72.291 67.773v496.994c0 36.144-31.631 67.773-72.291 67.773v0 0 0zM512 543.259c-58.732 0-108.432 45.187-108.432 99.402 0 36.144 22.586 67.773 54.218 85.849v94.887c0 27.108 22.586 49.696 54.218 49.696s54.218-22.586 54.218-49.696v-94.887c31.631-18.071 54.218-49.696 54.218-85.849 0-54.218-49.696-99.402-108.432-99.402v0 0zM512 114.031c-117.471 0-216.867 90.356-216.867 198.797h-108.432c0-162.655 144.582-298.202 320.79-298.202s320.79 135.546 320.79 298.202h-108.432c9.041-112.951-90.356-198.797-207.836-198.797v0 0zM512 114.031z" p-id="2171" fill="${fill}"></path></svg>`
    }
    return `data:image/svg+xml;base64,` + Base64.encode(types[type]);
  }
}

const colors = [
  '#0099FF',
  '#336666',
  '#996699',
  '#CC9999',
  '#AE9A93',
  '#FFCC66',
  '#CC6600',

  // '#83DCEC',
  // '#A4BDAC',
  // '#d4bbeb',
  // '#6493A8',
  // '#F5BD5F',
  // '#036776',
  // '#A7D2C7',
  // '#CBE474',
  // '#DBDA63',
  // '#AE9A93',
];
const colorMap = {};
Object.keys(types).forEach((type, i) => {
  colorMap[type] = colors[i];
})

export const vertexTypsColors = colorMap;