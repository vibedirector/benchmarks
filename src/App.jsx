import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

// Данные для демонстрации
const modelsData = [
  {
    id: 'meshy',
    name: 'Meshy',
    logo: '🔷',
    description: 'Популярная модель с хорошим балансом скорости и качества. Отлично справляется с персонажами и hard-surface объектами.',
    status: 'active',
    website: 'https://meshy.ai',
    multiImage: true,
    pricePerGen: '$0.20',
    lastTested: '2024-12-20',
    totalTeapots: 847,
    material: 'gold',
    // Общие показатели модели
    overallMetrics: {
      geometryQuality: 8,
      textureQuality: 7,
      referenceAccuracy: 8,
      hiddenGeometry: 6,
      hiddenTextures: 5
    },
    categories: {
      characters: {
        name: 'Персонажи',
        single: [
          {
            id: 1,
            inputImage: 'Воин в доспехах',
            previewImage: '/benchmarks/images/fff.png',
            metrics: { geometry: 8, textures: 7, accuracy: 9, completeness: 8 },
            totalTeapots: 32,
            resultCount: 3
          },
          {
            id: 2,
            inputImage: 'Девушка аниме',
            metrics: { geometry: 7, textures: 8, accuracy: 8, completeness: 7 },
            totalTeapots: 30,
            resultCount: 1
          }
        ],
        multi: [
          {
            id: 1,
            inputImage: 'Воин в доспехах (multi)',
            inputCount: 4,
            metrics: { geometry: 9, textures: 8, accuracy: 9, completeness: 9 },
            totalTeapots: 35,
            resultCount: 4
          }
        ]
      },
      hardSurface: {
        name: 'Hard-surface',
        single: [
          {
            id: 1,
            inputImage: 'Спорткар',
            metrics: { geometry: 9, textures: 8, accuracy: 9, completeness: 9 },
            totalTeapots: 35,
            resultCount: 2
          }
        ],
        multi: [
          {
            id: 1,
            inputImage: 'Спорткар (multi)',
            inputCount: 3,
            metrics: { geometry: 10, textures: 9, accuracy: 10, completeness: 9 },
            totalTeapots: 38,
            resultCount: 4
          }
        ]
      },
      organic: {
        name: 'Органика',
        single: [
          {
            id: 1,
            inputImage: 'Дерево',
            metrics: { geometry: 7, textures: 8, accuracy: 7, completeness: 6 },
            totalTeapots: 28,
            resultCount: 1
          }
        ],
        multi: []
      }
    }
  },
  {
    id: 'tripo',
    name: 'Tripo AI',
    logo: '🔺',
    description: 'Лидер по качеству генерации. Особенно хорош для детализированных моделей и сложных форм. Поддерживает до 8 изображений на входе.',
    status: 'active',
    website: 'https://tripo3d.ai',
    multiImage: true,
    pricePerGen: '$0.15',
    lastTested: '2024-12-18',
    totalTeapots: 912,
    material: 'diamond',
    overallMetrics: {
      geometryQuality: 9,
      textureQuality: 9,
      referenceAccuracy: 9,
      hiddenGeometry: 8,
      hiddenTextures: 7
    },
    categories: {
      characters: {
        name: 'Персонажи',
        single: [
          {
            id: 1,
            inputImage: 'Воин в доспехах',
            metrics: { geometry: 9, textures: 9, accuracy: 9, completeness: 9 },
            totalTeapots: 36,
            resultCount: 2
          }
        ],
        multi: [
          {
            id: 1,
            inputImage: 'Воин в доспехах (multi)',
            inputCount: 4,
            metrics: { geometry: 10, textures: 9, accuracy: 10, completeness: 10 },
            totalTeapots: 39,
            resultCount: 4
          }
        ]
      },
      hardSurface: {
        name: 'Hard-surface',
        single: [
          {
            id: 1,
            inputImage: 'Спорткар',
            metrics: { geometry: 9, textures: 9, accuracy: 10, completeness: 9 },
            totalTeapots: 37,
            resultCount: 3
          }
        ],
        multi: []
      },
      organic: {
        name: 'Органика',
        single: [
          {
            id: 1,
            inputImage: 'Дерево',
            metrics: { geometry: 8, textures: 8, accuracy: 8, completeness: 7 },
            totalTeapots: 31,
            resultCount: 1
          }
        ],
        multi: [
          {
            id: 1,
            inputImage: 'Дракон (multi)',
            inputCount: 4,
            metrics: { geometry: 9, textures: 9, accuracy: 9, completeness: 8 },
            totalTeapots: 35,
            resultCount: 4
          }
        ]
      }
    }
  },
  {
    id: 'rodin',
    name: 'Rodin',
    logo: '🗿',
    description: 'Специализируется на скульптурных и органических формах. Не поддерживает multi-image, но даёт стабильные результаты.',
    status: 'active',
    website: 'https://rodin.ai',
    multiImage: false,
    pricePerGen: '$0.25',
    lastTested: '2024-12-15',
    totalTeapots: 623,
    material: 'bronze',
    overallMetrics: {
      geometryQuality: 7,
      textureQuality: 6,
      referenceAccuracy: 7,
      hiddenGeometry: 5,
      hiddenTextures: 4
    },
    categories: {
      characters: {
        name: 'Персонажи',
        single: [
          {
            id: 1,
            inputImage: 'Воин в доспехах',
            metrics: { geometry: 6, textures: 7, accuracy: 7, completeness: 6 },
            totalTeapots: 26,
            resultCount: 1
          }
        ],
        multi: []
      },
      hardSurface: {
        name: 'Hard-surface',
        single: [
          {
            id: 1,
            inputImage: 'Спорткар',
            metrics: { geometry: 7, textures: 6, accuracy: 7, completeness: 7 },
            totalTeapots: 27,
            resultCount: 2
          }
        ],
        multi: []
      },
      organic: {
        name: 'Органика',
        single: [
          {
            id: 1,
            inputImage: 'Дерево',
            metrics: { geometry: 6, textures: 6, accuracy: 6, completeness: 5 },
            totalTeapots: 23,
            resultCount: 1
          }
        ],
        multi: []
      }
    }
  },
  {
    id: 'oldmodel',
    name: 'OldGen3D',
    logo: '📦',
    description: 'Устаревшая модель первого поколения. Оставлена для сравнения с современными решениями.',
    status: 'deprecated',
    website: 'https://example.com',
    multiImage: false,
    pricePerGen: '$0.10',
    lastTested: '2024-06-01',
    totalTeapots: 234,
    material: 'clay',
    overallMetrics: {
      geometryQuality: 4,
      textureQuality: 3,
      referenceAccuracy: 4,
      hiddenGeometry: 2,
      hiddenTextures: 2
    },
    categories: {
      characters: {
        name: 'Персонажи',
        single: [
          {
            id: 1,
            inputImage: 'Воин в доспехах',
            metrics: { geometry: 3, textures: 4, accuracy: 4, completeness: 3 },
            totalTeapots: 14,
            resultCount: 1
          }
        ],
        multi: []
      },
      hardSurface: {
        name: 'Hard-surface',
        single: [],
        multi: []
      },
      organic: {
        name: 'Органика',
        single: [],
        multi: []
      }
    }
  }
];

const materialStyles = {
  diamond: {
    bg: 'linear-gradient(135deg, #e8f4fc 0%, #a8e6ff 25%, #ffffff 50%, #c4f0ff 75%, #e0f7ff 100%)',
    glow: '0 0 30px rgba(168, 230, 255, 0.8), 0 0 60px rgba(168, 230, 255, 0.4)',
    label: 'Бриллиант',
    emoji: '💎'
  },
  gold: {
    bg: 'linear-gradient(135deg, #f5d442 0%, #ffd700 25%, #ffec80 50%, #daa520 75%, #f5d442 100%)',
    glow: '0 0 25px rgba(255, 215, 0, 0.6), 0 0 50px rgba(255, 215, 0, 0.3)',
    label: 'Золото',
    emoji: '🥇'
  },
  bronze: {
    bg: 'linear-gradient(135deg, #cd7f32 0%, #b8860b 25%, #daa06d 50%, #cd7f32 75%, #8b4513 100%)',
    glow: '0 0 20px rgba(205, 127, 50, 0.5), 0 0 40px rgba(205, 127, 50, 0.2)',
    label: 'Бронза',
    emoji: '🥉'
  },
  wood: {
    bg: 'linear-gradient(135deg, #8b4513 0%, #a0522d 25%, #cd853f 50%, #8b4513 75%, #654321 100%)',
    glow: '0 0 15px rgba(139, 69, 19, 0.4)',
    label: 'Дерево',
    emoji: '🪵'
  },
  clay: {
    bg: 'linear-gradient(135deg, #a0826d 0%, #bc8f8f 25%, #c4a484 50%, #a0826d 75%, #8b7355 100%)',
    glow: '0 0 10px rgba(160, 130, 109, 0.3)',
    label: 'Глина',
    emoji: '🏺'
  }
};

const metricLabels = {
  geometry: 'Геометрия',
  textures: 'Текстуры',
  accuracy: 'Точность',
  completeness: 'Полнота'
};

const overallMetricLabels = {
  geometryQuality: 'Качество геометрии',
  textureQuality: 'Качество текстур',
  referenceAccuracy: 'Близость к референсу',
  hiddenGeometry: 'Геометрия невидимых частей',
  hiddenTextures: 'Текстуры невидимых частей'
};

// Компонент чайника с материалом
// SVG Чайник с материалами
const MaterialTeapot = ({ material, size = 'medium' }) => {
  const sizeMap = {
    small: 40,
    medium: 56,
    large: 80
  };
  const px = sizeMap[size];

  // Градиенты для разных материалов
  const gradients = {
    diamond: {
      id: 'diamondGrad',
      stops: [
        { offset: '0%', color: '#E8F4FF' },
        { offset: '25%', color: '#A8E0FF' },
        { offset: '50%', color: '#E8F4FF' },
        { offset: '75%', color: '#7DD3FC' },
        { offset: '100%', color: '#C4E5FF' }
      ],
      stroke: '#88C8E8',
      shine: '#FFFFFF',
      shadow: 'rgba(168, 224, 255, 0.6)'
    },
    gold: {
      id: 'goldGrad',
      stops: [
        { offset: '0%', color: '#FFF7CC' },
        { offset: '30%', color: '#FFD700' },
        { offset: '50%', color: '#FFEC80' },
        { offset: '70%', color: '#FFD700' },
        { offset: '100%', color: '#CC9900' }
      ],
      stroke: '#B8860B',
      shine: '#FFFACD',
      shadow: 'rgba(255, 215, 0, 0.5)'
    },
    silver: {
      id: 'silverGrad',
      stops: [
        { offset: '0%', color: '#FFFFFF' },
        { offset: '30%', color: '#E8E8E8' },
        { offset: '50%', color: '#FFFFFF' },
        { offset: '70%', color: '#D0D0D0' },
        { offset: '100%', color: '#A8A8A8' }
      ],
      stroke: '#888888',
      shine: '#FFFFFF',
      shadow: 'rgba(200, 200, 200, 0.5)'
    },
    bronze: {
      id: 'bronzeGrad',
      stops: [
        { offset: '0%', color: '#E8A060' },
        { offset: '30%', color: '#CD7F32' },
        { offset: '50%', color: '#DDA15E' },
        { offset: '70%', color: '#CD7F32' },
        { offset: '100%', color: '#8B5A2B' }
      ],
      stroke: '#6B4423',
      shine: '#F4C794',
      shadow: 'rgba(205, 127, 50, 0.5)'
    },
    wood: {
      id: 'woodGrad',
      stops: [
        { offset: '0%', color: '#A0522D' },
        { offset: '25%', color: '#8B4513' },
        { offset: '50%', color: '#A0522D' },
        { offset: '75%', color: '#6B3E26' },
        { offset: '100%', color: '#5D3A1A' }
      ],
      stroke: '#3D2A1A',
      shine: '#C4A484',
      shadow: 'rgba(139, 69, 19, 0.4)'
    },
    clay: {
      id: 'clayGrad',
      stops: [
        { offset: '0%', color: '#C67B5C' },
        { offset: '30%', color: '#B85C3C' },
        { offset: '60%', color: '#A0522D' },
        { offset: '100%', color: '#8B4726' }
      ],
      stroke: '#5D3320',
      shine: '#D4A484',
      shadow: 'rgba(184, 92, 60, 0.4)'
    }
  };

  const grad = gradients[material] || gradients.clay;
  const uniqueId = `${grad.id}-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 64 64"
      style={{ filter: `drop-shadow(0 4px 12px ${grad.shadow})` }}
    >
      <defs>
        {/* Основной градиент */}
        <linearGradient id={uniqueId} x1="0%" y1="0%" x2="100%" y2="100%">
          {grad.stops.map((stop, i) => (
            <stop key={i} offset={stop.offset} stopColor={stop.color} />
          ))}
        </linearGradient>

        {/* Блик */}
        <radialGradient id={`${uniqueId}Shine`} cx="30%" cy="30%" r="50%">
          <stop offset="0%" stopColor={grad.shine} stopOpacity="0.7" />
          <stop offset="100%" stopColor={grad.shine} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ручка чайника (слева) */}
      <path
        d="M12 28 Q4 28 4 38 Q4 48 12 48"
        fill="none"
        stroke={`url(#${uniqueId})`}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M12 28 Q4 28 4 38 Q4 48 12 48"
        fill="none"
        stroke={grad.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Тело чайника */}
      <ellipse
        cx="32" cy="40" rx="20" ry="16"
        fill={`url(#${uniqueId})`}
        stroke={grad.stroke}
        strokeWidth="1.5"
      />

      {/* Блик на теле */}
      <ellipse
        cx="26" cy="35" rx="10" ry="7"
        fill={`url(#${uniqueId}Shine)`}
      />

      {/* Носик */}
      <path
        d="M50 36 Q56 34 57 28 Q58 24 54 24"
        fill="none"
        stroke={`url(#${uniqueId})`}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M50 36 Q56 34 57 28 Q58 24 54 24"
        fill="none"
        stroke={grad.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Крышка */}
      <ellipse
        cx="32" cy="24" rx="12" ry="4"
        fill={`url(#${uniqueId})`}
        stroke={grad.stroke}
        strokeWidth="1.5"
      />

      {/* Ручка на крышке */}
      <circle
        cx="32" cy="18" r="4"
        fill={`url(#${uniqueId})`}
        stroke={grad.stroke}
        strokeWidth="1.5"
      />

      {/* Маленький блик на ручке */}
      <circle
        cx="30" cy="16" r="1.5"
        fill={grad.shine}
        opacity="0.6"
      />
    </svg>
  );
};

// Компонент шкалы чайников (1-10)
const TeapotScale = ({ value, max = 10, showLabel = false }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[...Array(max)].map((_, i) => (
          <span
            key={i}
            className={`text-sm transition-all ${i < value ? 'opacity-100 scale-100' : 'opacity-20 scale-90'}`}
          >
            🫖
          </span>
        ))}
      </div>
      {showLabel && (
        <span className="text-sm text-gray-400">{value}/{max}</span>
      )}
    </div>
  );
};

// Карточка модели для главной
const ModelCard = ({ model }) => {
  const style = materialStyles[model.material];

  return (
    <Link
      to={`/model/${model.id}`}
      className={`
        relative p-6 rounded-2xl cursor-pointer group block
        transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1
        ${model.status === 'deprecated' ? 'opacity-60' : ''}
      `}
      style={{
        background: 'rgba(30, 30, 35, 0.8)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.3)'
      }}
    >
      {/* Ховер оверлей */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
          border: '1px solid rgba(255,255,255,0.15)'
        }}
      />

      {model.status === 'deprecated' && (
        <div className="absolute top-3 right-3 px-2 py-1 text-xs rounded bg-red-900/50 text-red-300">
          Устаревшая
        </div>
      )}

      <div className="flex items-start gap-4 relative z-10">
        <div className="transition-transform duration-300 group-hover:scale-110">
          <MaterialTeapot material={model.material} size="medium" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{model.logo}</span>
            <h3 className="text-xl font-bold text-white group-hover:text-gray-100 transition-colors">{model.name}</h3>
          </div>

          <div className="text-sm text-gray-400 mb-3">
            {style.emoji} {style.label} • {model.totalTeapots} чайников
          </div>

          {/* Описание модели */}
          <p className="text-sm text-gray-400 mb-3 line-clamp-2">
            {model.description}
          </p>

          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
            <span className="px-2 py-1 rounded bg-white/5 group-hover:bg-white/10 transition-colors">
              {model.multiImage ? '📷 Multi-image' : '📷 Single'}
            </span>
            <span className="px-2 py-1 rounded bg-white/5 group-hover:bg-white/10 transition-colors">
              💰 {model.pricePerGen}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Карточка теста (превью)
const TestPreviewCard = ({ test, isMulti, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="p-4 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/10"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <div className="aspect-square rounded-lg mb-3 flex items-center justify-center text-4xl relative overflow-hidden"
           style={{ background: 'linear-gradient(135deg, #2a2a30 0%, #1a1a1f 100%)' }}>
        {test.previewImage ? (
          <img src={test.previewImage} alt={test.inputImage} className="w-full h-full object-cover" />
        ) : (
          '🖼️'
        )}
        {isMulti && (
          <span className="absolute top-2 right-2 text-xs bg-white/10 text-gray-300 px-1.5 py-0.5 rounded">
            ×{test.inputCount}
          </span>
        )}
      </div>
      <div className="text-sm text-white">{test.inputImage}</div>
    </div>
  );
};

// Лайтбокс для просмотра изображений
const ImageLightbox = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  const filledImages = images.filter(img => img !== null);
  const currentImage = filledImages[currentIndex];

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-8"
      style={{ background: 'rgba(0,0,0,0.95)', zIndex: 9999 }}
      onClick={onClose}
    >
      <div className="relative flex items-center gap-4" onClick={e => e.stopPropagation()}>
        {/* Стрелка влево */}
        {filledImages.length > 1 && (
          <button
            onClick={onPrev}
            className="text-white/50 hover:text-white text-4xl p-2 transition-colors"
          >
            ←
          </button>
        )}

        {/* Изображение */}
        <div className="relative">
          <div
            className="rounded-lg flex items-center justify-center text-8xl min-w-[400px] min-h-[400px] overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #2a2a30 0%, #1a1a1f 100%)' }}
          >
            {currentImage === 'input' ? '🖼️' : '🧊'}
          </div>

          {/* Счётчик */}
          {filledImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/50 px-3 py-1 rounded-full">
              {currentIndex + 1} / {filledImages.length}
            </div>
          )}
        </div>

        {/* Стрелка вправо */}
        {filledImages.length > 1 && (
          <button
            onClick={onNext}
            className="text-white/50 hover:text-white text-4xl p-2 transition-colors"
          >
            →
          </button>
        )}

        {/* Кнопка закрыть */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/50 hover:text-white text-2xl"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

// Ячейка изображения (с плейсхолдером или картинкой)
const ImageCell = ({ hasImage, type, onClick, size = 'small' }) => {
  const sizeClasses = size === 'large' ? 'text-6xl' : 'text-2xl';

  return (
    <div
      onClick={hasImage ? onClick : undefined}
      className={`
        aspect-square rounded-lg flex items-center justify-center ${sizeClasses} overflow-hidden
        ${hasImage ? 'cursor-pointer hover:opacity-80 transition-opacity' : 'opacity-30'}
      `}
      style={{ background: 'linear-gradient(135deg, #2a2a30 0%, #1a1a1f 100%)' }}
    >
      {hasImage ? (type === 'input' ? '🖼️' : '🧊') : (
        <span className="text-gray-600 text-sm">—</span>
      )}
    </div>
  );
};

// Детали теста (модальное окно / развёрнутый вид)
const TestDetails = ({ test, isMulti, onClose, currentModel }) => {
  const [lightbox, setLightbox] = useState(null);
  const [showOtherModels, setShowOtherModels] = useState(false);
  const navigate = useNavigate();

  // Находим модели, у которых есть такой же тест того же типа (single/multi)
  const otherModelsWithTest = modelsData.filter(model => {
    if (model.id === currentModel.id) return false;

    // Ищем тест с таким же inputImage только в том же типе (single или multi)
    for (const [catKey, category] of Object.entries(model.categories)) {
      const testsOfSameType = isMulti ? (category.multi || []) : (category.single || []);
      if (testsOfSameType.some(t => t.inputImage === test.inputImage)) {
        return true;
      }
    }
    return false;
  });

  // Навигация к тесту в другой модели
  const handleNavigateToTest = (model, testInputImage, testIsMulti) => {
    for (const [catKey, category] of Object.entries(model.categories)) {
      const testsOfType = testIsMulti ? (category.multi || []) : (category.single || []);
      if (testsOfType.find(t => t.inputImage === testInputImage)) {
        navigate(`/model/${model.id}/${catKey}`);
        onClose();
        return;
      }
    }
  };

  // Формируем массивы для отображения
  const inputImages = isMulti
    ? [0, 1, 2, 3].map(i => i < (test.inputCount || 4) ? 'input' : null)
    : ['input'];

  const resultImages = test.resultCount > 1
    ? [0, 1, 2, 3].map(i => i < test.resultCount ? 'result' : null)
    : ['result'];

  const showResultGrid = resultImages.filter(r => r !== null).length > 1;

  const openLightbox = (type, index) => {
    setLightbox({ type, index });
  };

  const closeLightbox = () => setLightbox(null);

  const navigateLightbox = (direction) => {
    if (!lightbox) return;
    const images = lightbox.type === 'input' ? inputImages : resultImages;
    const filledCount = images.filter(img => img !== null).length;
    const newIndex = (lightbox.index + direction + filledCount) % filledCount;
    setLightbox({ ...lightbox, index: newIndex });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
         style={{ background: 'rgba(0,0,0,0.8)' }}
         onClick={onClose}>
      <div
        className="max-w-3xl w-full p-6 rounded-2xl max-h-[90vh] overflow-y-auto"
        style={{
          background: 'rgba(30, 30, 35, 0.95)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <span>{currentModel.logo}</span>
              <span>{currentModel.name}</span>
            </div>
            <h3 className="text-xl font-bold text-white">{test.inputImage}</h3>
            {isMulti && (
              <span className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                <MultiImageIcon className="w-4 h-4" /> {test.inputCount} изображений
              </span>
            )}
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-2xl">×</button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Input изображения */}
          <div>
            <span className="text-xs text-gray-500 mb-2 block">Input</span>
            {isMulti ? (
              <div className="grid grid-cols-2 gap-2">
                {inputImages.map((img, i) => (
                  <ImageCell
                    key={i}
                    hasImage={img !== null}
                    type="input"
                    onClick={() => {
                      const filledIndex = inputImages.slice(0, i + 1).filter(x => x !== null).length - 1;
                      openLightbox('input', filledIndex);
                    }}
                  />
                ))}
              </div>
            ) : (
              <ImageCell
                hasImage={true}
                type="input"
                size="large"
                onClick={() => openLightbox('input', 0)}
              />
            )}
          </div>

          {/* Result */}
          <div>
            <span className="text-xs text-gray-500 mb-2 block">Result</span>
            {showResultGrid ? (
              <div className="grid grid-cols-2 gap-2">
                {resultImages.map((img, i) => (
                  <ImageCell
                    key={i}
                    hasImage={img !== null}
                    type="result"
                    onClick={() => {
                      const filledIndex = resultImages.slice(0, i + 1).filter(x => x !== null).length - 1;
                      openLightbox('result', filledIndex);
                    }}
                  />
                ))}
              </div>
            ) : (
              <ImageCell
                hasImage={true}
                type="result"
                size="large"
                onClick={() => openLightbox('result', 0)}
              />
            )}
          </div>
        </div>

        {/* Лайтбокс */}
        {lightbox && (
          <ImageLightbox
            images={lightbox.type === 'input' ? inputImages : resultImages}
            currentIndex={lightbox.index}
            onClose={closeLightbox}
            onPrev={() => navigateLightbox(-1)}
            onNext={() => navigateLightbox(1)}
          />
        )}

        <div className="mb-4">
          <button className="px-4 py-2 rounded-lg text-sm text-white transition-colors"
                  style={{ background: 'rgba(100, 150, 255, 0.3)' }}>
            🔗 Открыть в 3D просмотрщике
          </button>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Метрики</h4>
          {Object.entries(test.metrics).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-gray-300">{metricLabels[key]}</span>
              <TeapotScale value={value} showLabel={true} />
            </div>
          ))}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-white font-semibold">Всего</span>
            <span className="text-xl">{test.totalTeapots} 🫖</span>
          </div>
        </div>

        {/* Ссылки на этот тест в других моделях */}
        {otherModelsWithTest.length > 0 && (
          <div className="mt-6 pt-4 border-t border-white/10 relative">
            <button
              onClick={() => setShowOtherModels(!showOtherModels)}
              className="px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              Этот тест в других моделях
              <span className={`transition-transform ${showOtherModels ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {showOtherModels && (
              <div
                className="absolute bottom-full left-0 mb-2 py-2 rounded-lg min-w-[200px]"
                style={{
                  background: 'rgba(40, 40, 45, 0.98)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
                }}
              >
                {otherModelsWithTest.map(model => (
                  <button
                    key={model.id}
                    onClick={() => handleNavigateToTest(model, test.inputImage, isMulti)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span>{model.logo}</span>
                    <span>{model.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Компонент общих показателей модели
const OverallMetrics = ({ metrics }) => {
  return (
    <div className="p-5 rounded-xl mb-6"
         style={{
           background: 'rgba(255,255,255,0.03)',
           border: '1px solid rgba(255,255,255,0.08)'
         }}>
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
        Общие показатели модели
      </h3>
      <div className="space-y-3">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-gray-300">{overallMetricLabels[key]}</span>
            <TeapotScale value={value} showLabel={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Иконка single image
const SingleImageIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);

// Иконка multi image (три карточки веером)
const MultiImageIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    {/* Задняя карточка (левая) */}
    <rect x="2" y="6" width="12" height="14" rx="1" transform="rotate(-10 8 13)" opacity="0.5" />
    {/* Средняя карточка */}
    <rect x="6" y="4" width="12" height="14" rx="1" opacity="0.75" />
    {/* Передняя карточка (правая) */}
    <rect x="10" y="6" width="12" height="14" rx="1" transform="rotate(10 16 13)" />
  </svg>
);

// Страница модели
const ModelPage = () => {
  const { modelId, category: initialCategory } = useParams();
  const navigate = useNavigate();
  const tabsRef = React.useRef(null);

  // Находим модель по ID
  const model = modelsData.find(m => m.id === modelId);

  // Если модель не найдена
  if (!model) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Модель не найдена</h1>
          <Link to="/" className="text-blue-400 hover:text-blue-300">← Вернуться на главную</Link>
        </div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState({
    category: initialCategory || 'characters',
    type: 'single'
  });
  const [selectedTest, setSelectedTest] = useState(null);
  const style = materialStyles[model.material];
  const categories = Object.entries(model.categories);

  // Скролл к табам при переходе из таблицы
  React.useEffect(() => {
    if (initialCategory && tabsRef.current) {
      setTimeout(() => {
        tabsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [initialCategory]);

  // Обновляем activeTab при изменении category в URL
  React.useEffect(() => {
    if (initialCategory && model.categories[initialCategory]) {
      setActiveTab(prev => ({ ...prev, category: initialCategory }));
    }
  }, [initialCategory, model.categories]);

  // Генерируем табы: для каждой категории — single и multi
  const tabs = [];
  categories.forEach(([key, category]) => {
    tabs.push({ category: key, type: 'single', name: category.name });
    if (model.multiImage) {
      tabs.push({ category: key, type: 'multi', name: category.name });
    }
  });

  const currentTests = model.categories[activeTab.category][activeTab.type] || [];

  return (
    <div className="min-h-screen p-6">
      {/* Кнопка назад */}
      <Link
        to="/"
        className="mb-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2 inline-block"
      >
        ← Назад к моделям
      </Link>

      {/* Шапка */}
      <div className="p-6 rounded-2xl mb-6"
           style={{
             background: 'rgba(30, 30, 35, 0.8)',
             border: '1px solid rgba(255,255,255,0.1)'
           }}>
        <div className="flex items-start gap-6">
          <MaterialTeapot material={model.material} size="large" />

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{model.logo}</span>
              <h1 className="text-3xl font-bold text-white">{model.name}</h1>
              {model.status === 'deprecated' && (
                <span className="px-2 py-1 text-xs rounded bg-red-900/50 text-red-300">
                  Устаревшая
                </span>
              )}
            </div>

            <div className="text-lg text-gray-300 mb-3">
              {style.emoji} {style.label} • {model.totalTeapots} чайников
            </div>

            {/* Описание */}
            <p className="text-gray-400 mb-4 max-w-2xl">
              {model.description}
            </p>

            <div className="flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-300">
                {model.multiImage ? '📷 Multi-image' : '📷 Single image'}
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-300">
                💰 {model.pricePerGen} за генерацию
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-300">
                📅 Тест: {model.lastTested}
              </span>
              <a href={model.website}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="px-3 py-1.5 rounded-lg bg-white/5 text-blue-400 hover:text-blue-300">
                🔗 Официальный сайт
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Общие показатели модели */}
      <OverallMetrics metrics={model.overallMetrics} />

      {/* Табы категорий */}
      <div ref={tabsRef} className="flex gap-2 mb-6 overflow-x-auto pb-2 flex-wrap scroll-mt-6">
        {tabs.map((tab, idx) => {
          const isActive = activeTab.category === tab.category && activeTab.type === tab.type;
          const isMulti = tab.type === 'multi';

          return (
            <button
              key={idx}
              onClick={() => setActiveTab({ category: tab.category, type: tab.type })}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                flex items-center gap-2
                ${isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-300'}
              `}
            >
              {isMulti ? <MultiImageIcon className="w-4 h-4" /> : <SingleImageIcon className="w-4 h-4" />}
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Контент категории */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {currentTests.map(test => (
          <TestPreviewCard
            key={test.id}
            test={test}
            isMulti={activeTab.type === 'multi'}
            onClick={() => setSelectedTest(test)}
          />
        ))}
        {currentTests.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            Нет тестов в этой категории
          </div>
        )}
      </div>

      {/* Модальное окно деталей теста */}
      {selectedTest && (
        <TestDetails
          test={selectedTest}
          isMulti={activeTab.type === 'multi'}
          onClose={() => setSelectedTest(null)}
          currentModel={model}
        />
      )}
    </div>
  );
};

// Функция расчёта средней оценки по категории
const getCategoryAverage = (model, categoryKey) => {
  const category = model.categories[categoryKey];
  if (!category) return null;

  const allTests = [...(category.single || []), ...(category.multi || [])];
  if (allTests.length === 0) return null;

  const total = allTests.reduce((sum, test) => {
    const metricsValues = Object.values(test.metrics);
    const avg = metricsValues.reduce((a, b) => a + b, 0) / metricsValues.length;
    return sum + avg;
  }, 0);

  return (total / allTests.length).toFixed(1);
};

// Ячейка с оценкой категории
const CategoryScoreCell = ({ model, categoryKey, isRowHovered }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTooltipHovered, setIsTooltipHovered] = useState(false);
  const score = getCategoryAverage(model, categoryKey);

  if (!score) {
    return <span className="text-gray-600">—</span>;
  }

  const showTooltip = isRowHovered || isHovered || isTooltipHovered;

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/model/${model.id}/${categoryKey}`}
        className="text-gray-300 cursor-pointer hover:text-white hover:underline transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {score}
      </Link>
      {showTooltip && (
        <Link
          to={`/model/${model.id}/${categoryKey}`}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs bg-gray-800 text-gray-300 rounded whitespace-nowrap cursor-pointer z-50"
          style={{
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            backgroundColor: isTooltipHovered ? '#374151' : '#1f2937',
            color: isTooltipHovered ? '#fff' : '#d1d5db',
            transition: 'background-color 0.15s, color 0.15s'
          }}
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={() => setIsTooltipHovered(true)}
          onMouseLeave={() => setIsTooltipHovered(false)}
        >
          Подробнее
        </Link>
      )}
    </span>
  );
};

// Строка таблицы с состоянием ховера
const TableRow = ({ model }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <tr
      onClick={() => navigate(`/model/${model.id}`)}
      className="border-b border-white/5 cursor-pointer transition-all duration-300 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
      }}
    >
      <td className="py-4 pr-4 relative">
        <div className="flex items-center gap-2">
          <span className={`text-xl transition-transform duration-200 ${isHovered ? 'scale-110' : ''}`}>{model.logo}</span>
          <span className="text-white font-medium">{model.name}</span>
        </div>
      </td>
      <td className="py-4 pr-4 relative">
        <div className="flex items-center gap-2">
          <div className={`transition-transform duration-200 ${isHovered ? 'scale-110' : ''}`}>
            <MaterialTeapot material={model.material} size="small" />
          </div>
          <span className="text-gray-400 text-sm">{model.totalTeapots}</span>
        </div>
      </td>
      <td className="py-4 pr-4 relative">
        <CategoryScoreCell
          model={model}
          categoryKey="characters"
          isRowHovered={isHovered}
        />
      </td>
      <td className="py-4 pr-4 relative">
        <CategoryScoreCell
          model={model}
          categoryKey="hardSurface"
          isRowHovered={isHovered}
        />
      </td>
      <td className="py-4 pr-4 relative">
        <CategoryScoreCell
          model={model}
          categoryKey="organic"
          isRowHovered={isHovered}
        />
      </td>
      <td className="py-4 pr-4 text-gray-300 relative">{model.multiImage ? '✓' : '—'}</td>
      <td className="py-4 pr-4 text-gray-300 relative">{model.pricePerGen}</td>
      <td className="py-4 relative">
        {model.status === 'deprecated' ? (
          <span className="text-red-400 text-sm">Устаревшая</span>
        ) : (
          <span className="text-green-400 text-sm">Актуальная</span>
        )}
      </td>
    </tr>
  );
};

// Сводная таблица
const SummaryTable = ({ models }) => {
  const [sortBy, setSortBy] = useState('totalTeapots');
  const [sortDir, setSortDir] = useState('desc');

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDir(sortDir === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(column);
      setSortDir('desc');
    }
  };

  const sortedModels = [...models].sort((a, b) => {
    let aVal, bVal;

    if (sortBy === 'totalTeapots') {
      aVal = a.totalTeapots;
      bVal = b.totalTeapots;
    } else if (sortBy === 'name') {
      aVal = a.name.toLowerCase();
      bVal = b.name.toLowerCase();
    } else if (sortBy === 'characters' || sortBy === 'hardSurface' || sortBy === 'organic') {
      aVal = parseFloat(getCategoryAverage(a, sortBy)) || 0;
      bVal = parseFloat(getCategoryAverage(b, sortBy)) || 0;
    } else {
      aVal = a[sortBy];
      bVal = b[sortBy];
    }

    if (sortDir === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const SortHeader = ({ column, children }) => (
    <th
      className="pb-3 pr-4 cursor-pointer hover:text-gray-200 transition-colors"
      onClick={() => handleSort(column)}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortBy === column && (
          <span className="text-xs">{sortDir === 'desc' ? '↓' : '↑'}</span>
        )}
      </div>
    </th>
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400 text-sm border-b border-white/10">
            <SortHeader column="name">Модель</SortHeader>
            <SortHeader column="totalTeapots">Рейтинг</SortHeader>
            <SortHeader column="characters">Персонажи</SortHeader>
            <SortHeader column="hardSurface">Hard-surface</SortHeader>
            <SortHeader column="organic">Органика</SortHeader>
            <th className="pb-3 pr-4">Multi-img</th>
            <th className="pb-3 pr-4">Цена</th>
            <th className="pb-3">Статус</th>
          </tr>
        </thead>
        <tbody>
          {sortedModels.map(model => (
            <TableRow
              key={model.id}
              model={model}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Компонент главной страницы
const HomePage = () => {
  const [view, setView] = useState('home'); // 'home' | 'table'
  const [showDeprecated, setShowDeprecated] = useState(false);

  const filteredModels = showDeprecated
    ? modelsData
    : modelsData.filter(m => m.status !== 'deprecated');

  return (
    <>
      {/* Шапка сайта */}
      <header className="p-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-4xl">🫖</span>
            <div>
              <h1 className="text-2xl font-bold text-white">3D AI Benchmark</h1>
              <p className="text-sm text-gray-500">Image-to-3D модели</p>
            </div>
          </Link>

          <nav className="flex items-center gap-4">
            <button
              onClick={() => setView('home')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'home' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Модели
            </button>
            <button
              onClick={() => setView('table')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'table' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Таблица
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* Главная - карточки моделей */}
        {view === 'home' && (
          <div className="p-6">
            {/* Фильтр */}
            <div className="flex items-center gap-4 mb-6">
              <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showDeprecated}
                  onChange={(e) => setShowDeprecated(e.target.checked)}
                  className="rounded"
                />
                Показать устаревшие модели
              </label>
            </div>

            {/* Сетка карточек */}
            <div className="grid md:grid-cols-2 gap-4">
              {filteredModels.map(model => (
                <ModelCard
                  key={model.id}
                  model={model}
                />
              ))}
            </div>
          </div>
        )}

        {/* Сводная таблица */}
        {view === 'table' && (
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showDeprecated}
                  onChange={(e) => setShowDeprecated(e.target.checked)}
                  className="rounded"
                />
                Показать устаревшие модели
              </label>
            </div>

            <div className="p-6 rounded-2xl"
                 style={{
                   background: 'rgba(30, 30, 35, 0.8)',
                   border: '1px solid rgba(255,255,255,0.1)'
                 }}>
              <SummaryTable
                models={filteredModels}
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
};

// Обёртка с общими стилями
const Layout = ({ children }) => (
  <div className="min-h-screen text-gray-100"
       style={{
         background: 'linear-gradient(135deg, #0f0f12 0%, #1a1a22 50%, #0f0f12 100%)',
         fontFamily: "'Space Grotesk', sans-serif"
       }}>
    {children}
  </div>
);

// Главный компонент
export default function App() {
  return (
    <BrowserRouter basename="/benchmarks">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/model/:modelId" element={<ModelPage />} />
          <Route path="/model/:modelId/:category" element={<ModelPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
