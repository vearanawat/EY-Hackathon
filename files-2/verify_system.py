#!/usr/bin/env python3
"""
System Verification Script
Checks if all components are properly configured and working
"""

import sys
import os

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    END = '\033[0m'
    BOLD = '\033[1m'

def print_header(text):
    print(f"\n{Colors.BOLD}{Colors.BLUE}{'=' * 70}")
    print(f"{text:^70}")
    print(f"{'=' * 70}{Colors.END}\n")

def check_mark(status):
    return f"{Colors.GREEN}✅{Colors.END}" if status else f"{Colors.RED}❌{Colors.END}"

def main():
    print_header("🔍 SYSTEM VERIFICATION")
    
    checks_passed = 0
    total_checks = 0
    
    # Check 1: Python version
    total_checks += 1
    print(f"{Colors.BOLD}1. Checking Python version...{Colors.END}")
    py_version = sys.version_info
    if py_version.major == 3 and py_version.minor >= 9:
        print(f"   {check_mark(True)} Python {py_version.major}.{py_version.minor}.{py_version.micro}")
        checks_passed += 1
    else:
        print(f"   {check_mark(False)} Python {py_version.major}.{py_version.minor}.{py_version.micro} (need 3.9+)")
    
    # Check 2: Required files
    total_checks += 1
    print(f"\n{Colors.BOLD}2. Checking required files...{Colors.END}")
    required_files = [
        'retail_agent_system.py',
        'mock_api_server.py',
        'interactive_chat.py',
        'demo_script.py',
        'requirements.txt'
    ]
    all_files_present = True
    for file in required_files:
        exists = os.path.exists(file)
        print(f"   {check_mark(exists)} {file}")
        if not exists:
            all_files_present = False
    
    if all_files_present:
        checks_passed += 1
    
    # Check 3: Python packages
    total_checks += 1
    print(f"\n{Colors.BOLD}3. Checking Python packages...{Colors.END}")
    required_packages = {
        'langgraph': 'LangGraph',
        'langchain': 'LangChain',
        'langchain_openai': 'LangChain OpenAI',
        'flask': 'Flask',
        'requests': 'Requests'
    }
    
    packages_installed = True
    for package, name in required_packages.items():
        try:
            __import__(package)
            print(f"   {check_mark(True)} {name}")
        except ImportError:
            print(f"   {check_mark(False)} {name} (not installed)")
            packages_installed = False
    
    if packages_installed:
        checks_passed += 1
    
    # Check 4: LLM API key (any of the supported ones)
    total_checks += 1
    print(f"\n{Colors.BOLD}4. Checking LLM API key...{Colors.END}")
    
    api_keys = {
        'GOOGLE_API_KEY': 'Google Gemini (FREE)',
        'OPENAI_API_KEY': 'OpenAI GPT',
        'GROQ_API_KEY': 'Groq (FREE)',
        'HUGGINGFACE_API_TOKEN': 'Hugging Face (FREE)'
    }
    
    key_found = False
    for key_name, description in api_keys.items():
        api_key = os.getenv(key_name)
        if api_key:
            print(f"   {check_mark(True)} {description} - {key_name} found")
            key_found = True
            break
    
    if not key_found:
        print(f"   {check_mark(False)} No LLM API key found")
        print(f"   {Colors.YELLOW}→ FREE options:{Colors.END}")
        print(f"     • Google Gemini: export GOOGLE_API_KEY='your-key'")
        print(f"     • Groq: export GROQ_API_KEY='your-key'")
        print(f"     • See FREE_LLM_SETUP.md for details")
    else:
        checks_passed += 1
    
    # Check 5: API server connectivity
    total_checks += 1
    print(f"\n{Colors.BOLD}5. Checking API server...{Colors.END}")
    try:
        import requests
        response = requests.get('http://localhost:5000/api/health', timeout=2)
        if response.status_code == 200:
            print(f"   {check_mark(True)} API server is running")
            checks_passed += 1
        else:
            print(f"   {check_mark(False)} API server returned status {response.status_code}")
    except Exception as e:
        print(f"   {check_mark(False)} API server is not running")
        print(f"   {Colors.YELLOW}→ Start with: python mock_api_server.py{Colors.END}")
    
    # Check 6: File permissions
    total_checks += 1
    print(f"\n{Colors.BOLD}6. Checking file permissions...{Colors.END}")
    if os.path.exists('setup.sh'):
        is_executable = os.access('setup.sh', os.X_OK)
        print(f"   {check_mark(is_executable)} setup.sh is executable")
        if is_executable:
            checks_passed += 1
    else:
        print(f"   {check_mark(False)} setup.sh not found")
    
    # Summary
    print(f"\n{Colors.BOLD}{'=' * 70}")
    print(f"VERIFICATION SUMMARY")
    print(f"{'=' * 70}{Colors.END}\n")
    
    percentage = (checks_passed / total_checks) * 100
    print(f"Checks Passed: {Colors.GREEN if percentage == 100 else Colors.YELLOW}{checks_passed}/{total_checks}{Colors.END} ({percentage:.0f}%)")
    
    if checks_passed == total_checks:
        print(f"\n{Colors.GREEN}{Colors.BOLD}✅ SYSTEM READY!{Colors.END}")
        print(f"\n{Colors.BLUE}Next steps:{Colors.END}")
        print("  1. Start API server: python mock_api_server.py")
        print("  2. Run demo: python demo_script.py")
        print("  3. Or chat: python interactive_chat.py")
    else:
        print(f"\n{Colors.YELLOW}{Colors.BOLD}⚠️  SETUP INCOMPLETE{Colors.END}")
        print(f"\n{Colors.BLUE}To fix issues:{Colors.END}")
        
        if not packages_installed:
            print("  • Install packages: pip install -r requirements.txt")
        
        if not api_key or not api_key.startswith('sk-'):
            print("  • Set API key: export OPENAI_API_KEY='your-key'")
        
        if checks_passed < total_checks - 1:  # More than just API server missing
            print("  • Run setup: ./setup.sh")
    
    print(f"\n{Colors.BOLD}{'=' * 70}{Colors.END}\n")
    
    return 0 if checks_passed == total_checks else 1

if __name__ == "__main__":
    sys.exit(main())
