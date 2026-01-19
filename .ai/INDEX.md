# FutCheck AI Agent Documentation

## Welcome!

This directory contains comprehensive documentation to help AI agents understand and work with the FutCheck codebase effectively.

## 📚 Documentation Index

### Core Documentation

1. **[README.md](README.md)** - **START HERE**
   - Quick start guide for AI agents
   - Common tasks quick reference
   - File location cheat sheet
   - Development commands

2. **[PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)**
   - What is FutCheck?
   - Tech stack overview
   - Project architecture
   - Key features
   - Environment variables
   - Routes reference

3. **[ARCHITECTURE.md](ARCHITECTURE.md)**
   - System architecture diagrams
   - Frontend architecture details
   - State management strategy
   - Data flow patterns
   - Component architecture
   - Performance optimizations

4. **[COMPONENTS.md](COMPONENTS.md)**
   - Component directory reference
   - Component organization
   - Common component props
   - Component communication patterns
   - Finding the right component

5. **[API.md](API.md)**
   - Complete API reference
   - All backend endpoints
   - Request/response formats
   - Authentication flow
   - Error handling
   - React Query usage

6. **[DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)**
   - Coding standards
   - Best practices
   - State management patterns
   - Performance optimization
   - Testing guidelines
   - Git workflow
   - Common pitfalls

### Examples & Tasks

7. **[examples/COMMON_TASKS.md](examples/COMMON_TASKS.md)**
   - Task templates with code examples
   - Adding new components
   - Adding API endpoints
   - Redux state management
   - Forms with validation
   - Drag and drop
   - Data visualization
   - Modals/dialogs

## 🚀 Quick Navigation

### I want to...

**Understand the project:**
→ Start with `README.md`, then `PROJECT_OVERVIEW.md`

**Add a new feature:**
→ Read `COMPONENTS.md` and `examples/COMMON_TASKS.md`

**Make an API call:**
→ Check `API.md` for available endpoints

**Follow coding standards:**
→ Review `DEVELOPMENT_GUIDE.md`

**Understand the architecture:**
→ Read `ARCHITECTURE.md`

**Find a component:**
→ Use `COMPONENTS.md` reference

**See code examples:**
→ Check `examples/COMMON_TASKS.md`

## 📁 Project Structure

```
futcheck/
├── .ai/                      # This documentation directory
│   ├── README.md            # Quick start guide
│   ├── PROJECT_OVERVIEW.md  # Project overview
│   ├── ARCHITECTURE.md      # Architecture details
│   ├── COMPONENTS.md        # Component reference
│   ├── API.md              # API documentation
│   ├── DEVELOPMENT_GUIDE.md # Coding standards
│   └── examples/
│       └── COMMON_TASKS.md  # Task templates
│
├── src/
│   ├── api/                 # API services
│   ├── components/          # React components
│   ├── redux/              # Redux state
│   ├── pages/              # Page components
│   ├── wasm/               # WebAssembly
│   ├── assets/             # Static assets
│   ├── App.tsx             # Main app
│   ├── routes.tsx          # Routes
│   └── main.tsx            # Entry point
│
├── public/                  # Public files
├── .env                     # Environment variables
├── package.json            # Dependencies
├── vite.config.ts          # Vite config
└── tsconfig.json           # TypeScript config
```

## 🎯 Common Use Cases

### 1. Adding a New Page
```
1. Read: COMPONENTS.md (Wrapper pattern)
2. Read: examples/COMMON_TASKS.md (Add a New Feature)
3. Create component in src/components/
4. Add route in src/routes.tsx
5. Follow: DEVELOPMENT_GUIDE.md (coding standards)
```

### 2. Making API Calls
```
1. Read: API.md (find endpoint)
2. Add function to src/api/apiService.js
3. Use React Query in component
4. Follow error handling patterns
```

### 3. Adding Redux State
```
1. Read: DEVELOPMENT_GUIDE.md (State Management)
2. Create slice in src/redux/
3. Add to store.js
4. Use in component with useSelector/useDispatch
```

### 4. Styling Components
```
1. Read: DEVELOPMENT_GUIDE.md (CSS/Styling)
2. Use Tailwind CSS utilities
3. Follow responsive design patterns
4. Check existing components for examples
```

## 🔧 Development Workflow

```bash
# 1. Read documentation
Start with README.md → PROJECT_OVERVIEW.md → relevant docs

# 2. Set up environment
cd /Users/saadshaikh/Desktop/futcheck/futcheck
npm install --legacy-peer-deps

# 3. Start dev server
npm run dev

# 4. Make changes
# Follow patterns in DEVELOPMENT_GUIDE.md
# Reference examples in examples/COMMON_TASKS.md

# 5. Test changes
npm run lint
# Test in browser at http://localhost:5173/

# 6. Build
npm run build
```

## 📖 Reading Order for New Agents

**First Time Working on FutCheck:**
1. README.md (15 min) - Get oriented
2. PROJECT_OVERVIEW.md (20 min) - Understand the project
3. COMPONENTS.md (15 min) - Learn component structure
4. Start coding! Reference other docs as needed

**For Specific Tasks:**
- Adding features → examples/COMMON_TASKS.md
- API work → API.md
- Following standards → DEVELOPMENT_GUIDE.md
- Understanding architecture → ARCHITECTURE.md

## 🆘 Troubleshooting

**Documentation unclear?**
- Check existing code for examples
- Look in `src/components/` for patterns
- Read inline code comments

**Can't find something?**
- Use file location cheat sheet in README.md
- Search component names in COMPONENTS.md
- Check API.md for endpoints

**Code not working?**
- Follow debugging tips in README.md
- Check DEVELOPMENT_GUIDE.md common pitfalls
- Verify environment variables in .env

## 📝 Documentation Maintenance

When adding new features:
- Update relevant documentation files
- Add examples to COMMON_TASKS.md
- Update component reference in COMPONENTS.md
- Document new API endpoints in API.md

## 🔗 Related Repositories

- **futcheck_backend** - Django REST API backend
- **futcheck_enhancer** - Browser extension

Backend documentation available in:
`/Users/saadshaikh/Desktop/futcheck/futcheck_backend/README.md`

## 💡 Tips for AI Agents

1. **Always start with README.md** - It has everything you need to get started
2. **Reference existing code** - Look at similar components for patterns
3. **Follow the style guide** - Consistency is important
4. **Use TypeScript** - Type safety helps prevent bugs
5. **Test your changes** - Run dev server and verify functionality
6. **Ask questions** - If unclear, ask the user for clarification

## 🎓 Key Takeaways

- **Vite not CRA**: Use `import.meta.env`, not `process.env`
- **React 19**: Use `--legacy-peer-deps` for installs
- **Redux + React Query**: Redux for global state, React Query for server data
- **Tailwind CSS**: Utility-first styling approach
- **Component patterns**: Wrapper pattern for pages, presentational components
- **Backend required**: Most features need the backend API running

---

**Happy coding! 🚀**

For questions or updates, refer to the main README.md or ask the user.
