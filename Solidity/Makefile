SRC = compare.sol compareLoop.sol compareStrings.sol \
	  lenBytes32.sol lenBytes32Loop.sol lenRunes.sol

EVM = $(SRC:.sol=.hex) $(SRC:.sol=_opt.hex)

CC = solc --bin

%.hex : %.sol strings.sol
	$(CC) $< | grep -A 2 $< | tail -1 > $@

%_opt.hex : %.sol strings.sol
	$(CC) --optimize $< | grep -A 2 $< | tail -1 > $@

all: $(EVM)

clean:
	rm -f $(EVM)
